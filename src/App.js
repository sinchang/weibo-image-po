import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import getUserHomepage from './weibo';
import Hexo from './components/Hexo'

class App extends Component {
  state = {
    imageUrl: '',
    homepageUrl: ''
  };


  handleChange = (event) => {
    this.setState({ imageUrl: event.target.value });
  }

  handleSubmit = () => {
    const imageUrl = this.state.imageUrl;
    if (imageUrl.indexOf('jpg') > -1 ||
      imageUrl.indexOf('png') > -1 ||
      imageUrl.indexOf('gif') > -1) {
      const homepageUrl = getUserHomepage(this.state.imageUrl);
      if (!homepageUrl) {
        this.clearInput()
        alert('请输入正确的图片地址');
        return;
      }
      this.setState({
        homepageUrl
      });
    } else {
      this.clearInput()
      alert('请输入正确的图片地址');
    }
  }

  showResult = () => {
    if (this.state.homepageUrl) {
      return (<p><a href={this.state.homepageUrl} target="_blank">po 主</a></p>)
    }
  }

  clearInput = () => {
    this.textInput.value = ''
  }

  render() {
    const url = this.state.homepageUrl;
    return (
      <div className="App">
        <Hexo />
        <div className="container" style={{ marginTop: '20px' }}>
          <div className="field has-addons has-addons-centered">
            <div className="control">
              <input className="input" type="text" ref={(input) => { this.textInput = input; }} onChange={this.handleChange} />
            </div>
            <div className="control">
              <a className="button is-primary" onClick={this.handleSubmit}>
                Search
              </a>
            </div>
          </div>
          {this.showResult()}
        </div>
      </div>
    );
  }
}

export default App;
