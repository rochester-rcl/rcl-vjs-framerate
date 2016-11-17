import videojs from 'video.js';

// Default options for the plugin.
const defaults = {};

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 * @param    {Object} [options={}]
 */
const onPlayerReady = (player, options) => {
  player.addClass('vjs-framerate');
  const framerates = [24.0, 18.0, 12.0, 6.0];
  const origFramerate = options.origFramerate ? options.origFramerate : 24.0;
  initControls(player, origFramerate, framerates);
};

/**
 * Function to initialize framerate buttons and bind them.
 *
 *
 * @function initControls
 * @param    {Player} player
 *@param {framerates} array
 */
 const initControls = (player, origFramerate, framerates) => {
   const vjsButtonClass = videojs.getComponent('Button');
   framerates.map((framerate, index) => {
     let name = framerate.toString().split('.')[0] + 'fps';
     let extendedButtonClass = videojs.extend(vjsButtonClass, {
       constructor: function() {
         vjsButtonClass.call(this, player);
       },
       handleClick: function() {
         player.playbackRate(framerate / origFramerate);
         console.log(player.playbackRate);
       }
     });
     let extendedButtonInstance = player.controlBar.addChild(new extendedButtonClass());
     extendedButtonInstance.addClass("vjs-" + name);
     let extendedButtonInstanceEl = extendedButtonInstance.el();
     extendedButtonInstanceEl.innerHTML = '<span class="vjs-control-text">' + name + '</span>' + name;
   });
 }


/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function framerate
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const framerate = function(options) {
  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
videojs.plugin('framerate', framerate);

// Include the version number.
framerate.VERSION = '__VERSION__';

export default framerate;
