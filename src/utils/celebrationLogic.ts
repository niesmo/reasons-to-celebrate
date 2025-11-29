import { addDays, differenceInDays, format } from 'date-fns';

export type Priority = 'High' | 'Medium' | 'Low';

export interface CelebrationDate {
  date: Date;
  daysFromStart: number;
  reason: string;
  type: 'repdigit' | 'palindrome' | 'sequential' | 'round' | 'other';
  priority: Priority;
  originalDate: string; // ISO string of the original start date
}

const isRepdigit = (n: number): boolean => {
  if (n < 10) return false;
  const s = n.toString();
  return s.split('').every((c) => c === s[0]);
};

const isPalindrome = (n: number): boolean => {
  if (n < 10) return false;
  const s = n.toString();
  return s === s.split('').reverse().join('');
};

const isSequential = (n: number): boolean => {
  if (n < 10) return false;
  const s = n.toString();
  const digits = '0123456789';
  const revDigits = '9876543210';
  return digits.includes(s) || revDigits.includes(s);
};

const isSequentialPalindrome = (n: number): boolean => {
  if (!isPalindrome(n)) return false;
  // It's a palindrome, check if the first half is sequential
  const s = n.toString();
  const len = s.length;
  const halfLen = Math.ceil(len / 2);
  const firstHalf = s.substring(0, halfLen);

  const digits = '0123456789';
  const revDigits = '9876543210';
  return digits.includes(firstHalf) || revDigits.includes(firstHalf);
};

const isRound = (n: number): boolean => {
  if (n < 100) return false;
  return n % 100 === 0;
};

export const getCelebrationDates = (startDate: Date, count: number = 50): CelebrationDate[] => {
  const candidates: CelebrationDate[] = [];

  // Calculate days from start date to today to avoid showing past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDiff = differenceInDays(today, startDate);
  let days = Math.max(1, startDiff);

  // We scan a larger range to find high quality matches
  // Scan up to 100,000 days or until we have enough high quality matches
  // We'll collect more than 'count' and then filter/sort
  const limit = days + 100000;
  const maxCandidates = count * 5; // Collect extra candidates to filter from

  while (candidates.length < maxCandidates && days < limit) {
    let reason = '';
    let type: CelebrationDate['type'] = 'other';
    let priority: Priority = 'Low';

    if (isRepdigit(days)) {
      reason = `Repdigit! All digits are ${days.toString()[0]}`;
      type = 'repdigit';
      priority = 'High';
    } else if (isSequentialPalindrome(days)) {
      reason = 'Sequential Palindrome! A rare symmetrical sequence';
      type = 'palindrome';
      priority = 'High';
    } else if (isSequential(days)) {
      reason = 'Sequential! The digits are in order';
      type = 'sequential';
      priority = 'High';
    } else if (isPalindrome(days)) {
      reason = 'Palindrome! Reads the same backwards';
      type = 'palindrome';
      priority = 'Medium';
    } else if (isRound(days)) {
      reason = 'Round Number! A nice clean milestone';
      type = 'round';
      priority = 'Low';
    }

    if (reason) {
      candidates.push({
        date: addDays(startDate, days),
        daysFromStart: days,
        reason,
        type,
        priority,
        originalDate: startDate.toISOString(),
      });
    }
    days++;
  }

  // Filter and Sort Strategy
  // 1. Separate by priority
  const high = candidates.filter(c => c.priority === 'High');
  const medium = candidates.filter(c => c.priority === 'Medium');
  const low = candidates.filter(c => c.priority === 'Low');

  // 2. Fill results with High, then Medium, then Low until we reach count
  let results = [...high];

  if (results.length < count) {
    results = [...results, ...medium];
  }

  if (results.length < count) {
    // Only take enough low priority items to fill the rest
    const remaining = count - results.length;
    results = [...results, ...low.slice(0, remaining)];
  }

  // 3. Sort the final list by date (daysFromStart) so they appear in chronological order
  results.sort((a, b) => a.daysFromStart - b.daysFromStart);

  // 4. Trim to requested count
  return results.slice(0, count);
};
