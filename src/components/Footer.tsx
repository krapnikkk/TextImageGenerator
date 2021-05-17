import * as React from 'react'
import { Layout } from 'antd'
const { Footer } = Layout
import './Footer.css';

export default class FooterComponent extends React.Component {
    render() {
        return (<Footer  className="footer">Ant Design ©2018 Created by Ant UED</Footer>)
    }
}