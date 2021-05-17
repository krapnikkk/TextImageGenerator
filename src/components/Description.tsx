import * as React from 'react'
// import * as ReactMarkdown from 'react-markdown'
// import description from "../../readme.md";
import './Description.css';


export default class Description extends React.Component {
    render() {
        return (
            <section className="description">
                {/* <ReactMarkdown>{description}</ReactMarkdown> */}
                <h1>TextImageGenerator</h1>
            </section>
        )
    }
}