import * as React from 'react'
import { Layout } from 'antd'
const { Footer } = Layout
import './Footer.css';

export default class FooterComponent extends React.Component {
    render() {
        return (<Footer  className="footer">TextImageGenerator ©2021 Created by krapnik</Footer>)
    }
}