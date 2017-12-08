import React from 'react';
import {
  ShareButtons,
  generateShareIcon,
} from 'react-share';

const {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  VKShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const TelegramIcon = generateShareIcon('telegram');
const VKIcon = generateShareIcon('vk');

const shareUrl = String(window.location);
const title = 'Test';
const iconSize = 42;

class Socials extends React.Component {
  constructor (props) {
    super(props);

    this.facebookClickHandler = this.facebookClickHandler.bind(this);
    this.twitterClickHandler = this.twitterClickHandler.bind(this);
    this.telegramClickHandler = this.telegramClickHandler.bind(this);
    this.vkontakteClickHandler = this.vkontakteClickHandler.bind(this);

  }

  facebookClickHandler() {
    this.props.onClick('facebook');
  }

  twitterClickHandler() {
    this.props.onClick('twitter');
  }

  telegramClickHandler() {
    this.props.onClick('telegram');
  }

  vkontakteClickHandler() {
    this.props.onClick('vkontakte');
  }

  render() {
      return (
          <div className = "socials-wrapper">
              <div className = "socials-network" onClick = {this.facebookClickHandler}>
                  <FacebookShareButton
                      url = {shareUrl}
                      title = {title}
                      className = "socials-network-facebook">
                      <FacebookIcon
                          size = {iconSize}
                          round />
                  </FacebookShareButton>
              </div>

              <div className = "socials-network" onClick = {this.twitterClickHandler}>
                  <TwitterShareButton
                      url = {shareUrl}
                      title = {title}
                      className = "socials-network-twitter">
                      <TwitterIcon
                          size={iconSize}
                          round />
                  </TwitterShareButton>
              </div>

              <div className="socials-network" onClick = {this.telegramClickHandler}>
                  <TelegramShareButton
                      url = {shareUrl}
                      windowWidth = {660}
                      windowHeight = {460}
                      className = "socials-network-telegram">
                      <TelegramIcon
                          size = {iconSize}
                          round />
                  </TelegramShareButton>
              </div>

              <div className="socials-network" onClick = {this.vkontakteClickHandler}>
                  <VKShareButton
                      url = {shareUrl}
                      windowWidth = {660}
                      windowHeight = {460}
                      className = "socials-network-vkontakte">
                      <VKIcon
                          size={iconSize}
                          round />
                  </VKShareButton>
              </div>
          </div>
      );
  }
};

export default Socials;
