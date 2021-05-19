import * as React from 'react'
import { Layout } from 'antd'
import './Header.css';
const { Header } = Layout


export default class HeaderComponent extends React.Component {
    render() {
        return (<Header className="header">
            <h1 className="logo">TextImageGenerator</h1>
            <iframe src="https://ghbtns.com/github-btn.html?user=krapnikkk&repo=TextImageGenerator&type=star" frameBorder="0" scrolling="0" width="90px" height="21px"></iframe>
          </Header>)
    }
}