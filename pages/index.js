import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Layout, Row, Col, DatePicker, Table, Divider, Space } from 'antd'
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
          <title>Reasons To Celebrate</title>
          <meta name="description" content="More reasons to celebrate" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <Content>
          <main>
            <Row>
              <Col span={12} offset={6}>
                <p className={styles.banner}>Find more reasons to celebrate 🎉</p>
                <Space size="large" align="center">
                  <div>Pick a date</div>
                  <DatePicker size="large" onChange={this.datePicked}></DatePicker>
                </Space>
                {/* <Row justify="space-around" align="middle">
                  <Col span={4}>Pick a date</Col>
                  <Col span={20}>
                    <DatePicker size="large" onChange={this.datePicked}></DatePicker>
                  </Col>
                </Row> */}
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
