
import * as React from 'react';
import { Provider } from 'mobx-react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import AppStore from '../store'
import './App.css';
import { XMLSerializer } from "xmldom";
window['XMLSerializer'] = XMLSerializer;

let _serializeToString = XMLSerializer.prototype.serializeToString;
XMLSerializer.prototype.serializeToString = (node: any, isHtml: any, nodeFilter: any) => {
  let string = _serializeToString(node, isHtml, nodeFilter);
  if(node.getAttribute("textClip") == "true"){
    if(string.indexOf("; background-image: ")>-1){// chrome 90-
      string = string.replace("; background-image: ","; -webkit-background-clip: text; background-image:");
    }else if(string.indexOf(" text rgba(0, 0, 0, 0); ")>-1){ // chrome 90+
      string = string.replace(" text rgba(0, 0, 0, 0);","; -webkit-background-clip: text;");
    }
  }
  string = string.replace(/(SECTION)/g,"section");
  string = string.replace(/(RUBY)/g,"ruby");
  string = string.replace(/(RT)/g,"rt");
  string = string.replace(/(STYLE)/g,"style");
  return string;
}

const App: React.FC = () => (
  <Provider AppStore={AppStore}>
    <div className="Container">
      <Header />
      <Content />
      <Footer />
    </div>
  </Provider>
);

export default App;