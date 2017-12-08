import React, { Component } from 'react';

import Word from './components/word.jsx';
import Button from './components/button.jsx';
import { setUrlState } from './modules/urlstate.js';
import { sendAnalytics } from './modules/analytics';
import { colors } from './config/colors.js';


class App extends Component {
  constructor (props) {
    super(props);

    this.state = props.state;
    this.lastId = this.getLastId();
    this.soundOnce = new Audio();
    this.soundLoop = new Audio();
    this.volume = 0.5;
    this.lastScroll = 0;

    this.calcButtonHandler = this.calcButtonHandler.bind(this);
    this.wordButtonHandler = this.wordButtonHandler.bind(this);
    this.playAllButtonHandler = this.playAllButtonHandler.bind(this);
    this.stopAllButtonHandler = this.stopAllButtonHandler.bind(this);
    this.clearAllButtonHandler = this.clearAllButtonHandler.bind(this);
    this.updateStateHandler = this.updateStateHandler.bind(this);
  };

  componentDidMount() {
    this.playAllSounds();
  }

  componentDidUpdate (evt) {
    this.refs.display.scrollLeft = this.refs.display.scrollWidth;
  }

  wordButtonHandler(id) {
    this.stopAllSounds();
    this.clearPlaying();

    this.setState({
      words: this.state.words.filter( word => word.id !== id)
    }, this.updateStateHandler);
  };

  calcButtonHandler(buttonName) {
    this.setState({
      words: [...this.state.words, {
        name: buttonName,
        id: this.lastId,
        isPlayingNow: false
      }]
    }, this.updateStateHandler);
    this.lastId++;
    this.playOnce(buttonName);

    sendAnalytics({
      'button': buttonName
    });
  };

  playAllButtonHandler() {
    this.playAllSounds();

    sendAnalytics({
      'button': 'playAll',
    });
  }

  stopAllButtonHandler() {
    this.stopAllSounds();

    sendAnalytics({
      'button': 'stopAll',
    });
  }

  clearAllButtonHandler() {
    this.clearAllSounds();

    sendAnalytics({
      'button': 'clearAll',
    });
  }

  updateStateHandler(evt) {
    setUrlState(this.state.words);
  }

  playAllSounds() {
    this.stopAllSounds();
    if (!this.state.words.length) {
      return;
    }

    const sequence = this.state.words.map(word => word);
    this.soundLoop.addEventListener('ended', evt => {
      const audio = sequence.shift();
      if (!audio) {
        this.clearPlaying();
        return;
      }
      this.showPlayingWord(audio.id);
      this.playLoop(audio.name)
    });
    this.soundLoop.dispatchEvent(new Event('ended'));
  };

  stopAllSounds() {
    this.stop();
    this.clearPlaying();
  };

  clearAllSounds() {
    const callback = function() {
      this.playOnce('ydis');
      this.updateStateHandler();
    }
    this.stopAllSounds();
    this.setState({
      words: []
    }, callback);
  };

  showPlayingWord(id) {
    const newWords = this.state.words.map( word => {
      word.isPlayingNow = word.id === id ? true : false;
      return word;
    });

    this.setState({
      words: [...newWords]
    })
  };

  clearPlaying() {
    const clearedWords = this.state.words.map( word => {
      word.isPlayingNow = false
      return word
    });

    this.setState({
      words: [...clearedWords]
    });
  }

  playOnce(filename) {
    this.stop();
    this.soundOnce.src = this.getPath(filename);
    this.soundOnce.volume = this.volume;
    this.soundOnce.play();
  }

  playLoop(filename) {
    this.soundLoop.src = this.getPath(filename);
    this.soundLoop.volume = this.volume;
    this.soundLoop.play();
  }

  stop() {
    this.soundLoop.pause();
  }

  getLastId() {
    return this.state.words.length;
  }

  getPath(filename) {
    return `static/pezdox/${filename}.wav`;
  }

  render() {
    return (
      <div className="App">

          <div className="display-wrapper">
            <div className="display-backing">
                <div className="display" ref='display'>
                    {this.state.words.map( (word, index) => {
                        return <Word
                          key = {index}
                          text = {word.name}
                          id = {word.id}
                          onClick = {this.wordButtonHandler}
                          color = {colors[`${word.name}`]}
                          isPlayingNow = {word.isPlayingNow}
                          /> }
                    )}
                </div>
            </div>
        </div>

        <div className='buttons-wrapper'>
          <div className='buttons buttons-control'>
            <Button text = {'Play'} onClick = {this.playAllButtonHandler} color = {'control-color'} />
            <Button text = {'Stop'} onClick = {this.stopAllButtonHandler} color = {'control-color'} />
            <Button text = {'Clear'} onClick = {this.clearAllButtonHandler} color = {'control-color'} />
          </div>
          <div className='buttons'>
            {
              this.state.buttons.map( (button, index) =>
                <Button
                  key = {index}
                  text = {button}
                  color = {colors[`${button}`]}
                  onClick = {this.calcButtonHandler}
                  />)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;