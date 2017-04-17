import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    Phaser.Canvas.setImageRenderingCrisp(game.canvas);  //for Canvas, modern approach
    Phaser.Canvas.setSmoothingEnabled(game.context, false);  //also for Canvas, legacy approach
    PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST; //for WebGL

    this.stage.backgroundColor = '#EDEEC9';
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading', { font: '16px Arial', fill: '#dddddd', align: 'center' });
    text.anchor.setTo(0.5, 0.5);
    //assets we'll use in the loading screen
    this.load.image('preloadBg', './assets/images/loader-bg.png');
    this.load.image('preloadbar', './assets/images/preloader-bar.png');
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Preload');
    }
  }

  fontsLoaded () {
    this.fontsReady = true;
  }
}
