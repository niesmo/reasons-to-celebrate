import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Layout, Row, Col, DatePicker, Table, Divider } from 'antd'
import { format } from 'date-fns'
import { findSignificantDates } from '../lib/utils'
import { Component } from 'react';

const { Content } = Layout;


export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      significantDates : []
    }

    this.datePicked = this.datePicked.bind(this)
  }
  
  columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Days Since',
      dataIndex: 'daysSince',
      key: 'daysSince',
    }
  ];

  render () {
    return (
      <>
        <Head>
          <title>More Reasons To Celebrate</title>
          <meta name="description" content="More reasons to celebrate" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <Content>
          <main>
            <Row>
              <Col span={8} offset={8}>
                <h1>We all need more reasons to celebrate</h1>
                <p>find the dates for your next celebration 🎉🥳</p>
                <div>
                  <p>Pick a date that's significat to you</p>
                  <DatePicker onChange={this.datePicked}></DatePicker>
                </div>
                <Divider />
                <div>
                  <h3>Dates to celebrate:</h3>
                  <Table dataSource={this.state.significantDates} columns={this.columns} size="small" pagination={false}/>
                </div>
              </Col>
            </Row>

  
          </main>
        </Content>
      </>
    )
  }
  
  datePicked (_, date){
    let significantDates = findSignificantDates(date).map((data, i) => {
      let formattedDate = format(data.date, 'MM/dd/yyyy')
      return { 
        key : i, 
        date : formattedDate, 
        daysSince : data.numberOfDaysInBetween 
      }
    })

    this.setState({ significantDates : significantDates })
    console.log(significantDates)
  }
}
