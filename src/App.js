import React, {Component} from 'react'
import Light from './components/light'
import Button from './components/button'
import './App.css'
class App extends Component {
  state = {
    lights: {
      go: false,
      caution: false,
      stop: false,
      stop_caution: false
    },
    sequence: [
      ['stop'],
      ['stop_caution'],
      ['go'],
      ['caution']
    ],
  }
  clearAll = () => {
    let resetLights = this.state.lights;
    for (let key in resetLights) {
      if (resetLights.hasOwnProperty(key)) {
        resetLights[key] = false;
      }
    }
    this.setState({
      lights: resetLights
    });
  }
  turnOn = (key) => {
    this.clearAll();
    let modifiedLights = this.state.lights;
    if (modifiedLights.hasOwnProperty(key)) {
      modifiedLights[key] = true;
      this.setState({
        lights: modifiedLights
      });
    }
  }

  autoGo = () => {
    this.timer = null;
    let i = 0;
    const SECONDS_BETWEEN_CHANGES = 1000;
    this.timer = setInterval(() => {
      let lightSequence = this.state.sequence;
      let lights = lightSequence[i];
      for (const light of lights) {
        this.turnOn(light);
      }
      if (i < lightSequence.length - 1) {
        i += 1;
      } else {
        i = 0;
      }
    }, SECONDS_BETWEEN_CHANGES);
  }

  autoStop = () => {
    clearInterval(this.timer);
  };
    
  render() { 
    return (<><div className='outer'>
      <div className='inner'>
        <Light className={this.state.lights.stop || this.state.lights.stop_caution ? 'light stop' : 'light'}/>
        <Light className={this.state.lights.caution || this.state.lights.stop_caution ? 'light caution' : 'light'} />
        <Light className={this.state.lights.go ? 'light go' : 'light'}/>
      </div>
    </div>
      <footer>
        <Button label={'Stop'} className ='button stop' onClick={()=>this.turnOn('stop')}/>
        <Button label={'Caution'} className ='button caution' onClick={()=>this.turnOn('caution')}/>
        <Button label={'Go'} className ='button go' onClick={()=>this.turnOn('go')}/>
        <Button label={'Auto Stop'} className='button stop' onClick={this.autoStop}/>
        <Button label={'Auto Go'} className='button go' onClick={this.autoGo}/>
        <Button label={'Reset'} className='button' onClick={this.clearAll}/>
      </footer>
    </>);
  }
}

export default App ;