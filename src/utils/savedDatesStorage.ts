export interface SavedDate {
    id: string;
    name: string;
    date: string; // ISO date string (YYYY-MM-DD)
    createdAt: number; // timestamp
}

const STORAGE_KEY = 'reasons-to-celebrate-saved-dates';
const MAX_SAVED_DATES = 50; // Prevent abuse

/**
 * Sanitize input to prevent XSS attacks
 */
const sanitizeInput = (input: string): string => {
    // Remove any HTML tags and trim whitespace
    return input.replace(/<[^>]*>/g, '').trim();
};

/**
 * Get all saved dates from localStorage
 */
export const getSavedDates = (): SavedDate[] => {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];

        const dates = JSON.parse(stored) as SavedDate[];
        // Sort by creation date, newest first
        return dates.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
        console.error('Error reading saved dates:', error);
        return [];
    }
};

/**
 * Save a new date with a custom name
 */
export const saveDateWithName = (name: string, date: string): SavedDate | null => {
    if (typeof window === 'undefined') return null;

    try {
        const sanitizedName = sanitizeInput(name);

        // Validate inputs
        if (!sanitizedName || sanitizedName.length === 0) {
            throw new Error('Name cannot be empty');
        }

        if (sanitizedName.length > 100) {
            throw new Error('Name is too long (max 100 characters)');
        }

        if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            throw new Error('Invalid date format');
        }

        const existingDates = getSavedDates();

        // Check if we've reached the limit
        if (existingDates.length >= MAX_SAVED_DATES) {
            throw new Error(`Maximum of ${MAX_SAVED_DATES} saved dates reached`);
        }

        // Check for duplicate
        const duplicate = existingDates.find(d => d.date === date && d.name === sanitizedName);
        if (duplicate) {
            throw new Error('This date with this name already exists');
        }

        const newDate: SavedDate = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: sanitizedName,
            date,
            createdAt: Date.now(),
        };

        const updatedDates = [...existingDates, newDate];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDates));

        return newDate;
    } catch (error) {
        console.error('Error saving date:', error);
        throw error;
    }
};

/**
 * Delete a saved date by ID
 */
export const deleteSavedDate = (id: string): boolean => {
    if (typeof window === 'undefined') return false;

    try {
        const existingDates = getSavedDates();
        const filteredDates = existingDates.filter(d => d.id !== id);

        if (filteredDates.length === existingDates.length) {
            return false; // ID not found
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredDates));
        return true;
    } catch (error) {
        console.error('Error deleting date:', error);
        return false;
    }
};
