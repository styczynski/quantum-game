/**
 * @author Hakan Karlidag - @axaq
 */

/**
 * Holds and manages all the logic for tween animations and map-object movement on the map.
 * This is created and used by EngineView instances.
 *
 * @class MoveEngine
 * @constructor
 * @param engine {EngineView} the engine instance that the animations will perform on
 * @param [defaultSpeed=3] {Number} default speed for the map-objects to be used when they move on map
 */
TRAVISO.MoveEngine = function(engine, defaultSpeed)
{
    /**
     * A reference to the engine view that uses this move engine.
     * @property {EngineView} engine
     * @protected
     */
    this.engine = engine;
    
    /**
     * The speed value to be used for object movements if not defined specifically.
     * @property {Number} DEFAULT_SPEED
     * @protected
     * @default 3
     */
    this.DEFAULT_SPEED = defaultSpeed || 3;
    
    /**
     * Specifies if the move-engine will process the object movements.
     * @property {Boolean} activeForMovables
     * @protected
     */
    /**
     * Specifies if the move-engine will process the tweens.
     * @property {Boolean} activeForTweens
     * @protected
     */
    /**
     * Specifies if the move-engine will process the tweens and object movements.
     * @property {Boolean} processFrame
     * @protected
     */
    this.activeForMovables = false;
    this.activeForTweens = false;
    this.processFrame = true;
    
    /**
     * The list to store current map-objects in move.
     * @property {Array(ObjectView)} movables
     * @protected
     */
    /**
     * The list to store targets for the current tweens.
     * @property {Array(Object)} tweenTargets
     * @protected
     */
    this.movables = [];
    this.tweenTargets = [];
    
    /**
     * Used to calculate how many frames a tween will take to process.
     * @property {Number} fps
     * @protected
     */
    this.fps = 60;
    
    this.processFunc = this.run.bind(this);
    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add(this.processFunc);
    this.ticker.start();
};

// constructor
TRAVISO.MoveEngine.constructor = TRAVISO.MoveEngine;

/**
 * Adds a single tween for the given object.
 *
 * @method addTween
 * @param o {Object} the object to add tween animation to
 * @param duration {Number} the duration of the tween animation in seconds
 * @param vars {Object} the object defining which properties of the target object will be animated
 * @param [delay=0] {Number} the amount of waiting before the tween animation starts, in seconds
 * @param [easing="linear"] {String} type of the easing
 * @param [overwrite=false] {Boolean} if the other tween animations assigned to the same object are going to be killed
 * @param [onComplete=null] {Function} callback function to be called after the tween animation finished
 */
TRAVISO.MoveEngine.prototype.addTween = function(o, duration, vars, delay, easing, overwrite, onComplete)
{
    var v = null;
    for (var prop in vars)
    {
        if (o[prop] !== vars[prop])
        {
            if (!v) { v = {}; }
            v[prop] = { b: o[prop], c: vars[prop] - o[prop] };
        }
    }
    
    if (v)
    {
        var t = {
            target : 		o,
            duration : 		duration,
            delay : 		Number(delay) || 0,
            easingFunc : 	this.getEasingFunc(easing),
            overwrite : 	overwrite || false,
            onComplete : 	onComplete || null,
            totalFrames : 	duration * this.fps,
            currentFrame : 	0,
            vars : 			v
        };
                
        var idx = this.tweenTargets.indexOf(o); 
        if (idx >= 0)
        {
            var tweens = o.tweens;
            if (!tweens)
            {
                tweens = [];
            }
            if (t.overwrite)
            {
                for (var i=0; i < tweens.length; i++)
                {
                    tweens[i] = null;
                }
                tweens = [];
            }
            
            tweens[tweens.length] = t;
            o.tweens = tweens;
        }
        else
        {
            o.tweens = [t];
            this.tweenTargets[this.tweenTargets.length] = o;
        }
        
        if (this.tweenTargets.length > 0 && !this.activeForTweens)
        {
            this.activeForTweens = true;
        }
    }
};

/**
 * Removes a single tween from the given object.
 *
 * @method removeTween
 * @param o {Object} the object to remove the tween animation from
 * @param t {Object} the tween to be removed from the object
 * @return {Boolean} if the tween is found and removed
 */
TRAVISO.MoveEngine.prototype.removeTween = function(o, t)
{
    var targetRemoved = false;
    
    if (o && t)
    {
        var idx = this.tweenTargets.indexOf(o); 
        if (idx >= 0)
        {
            if (this.tweenTargets[idx].tweens && this.tweenTargets[idx].tweens.length > 0)
            {
                var tweens = this.tweenTargets[idx].tweens;
                var idx2 = tweens.indexOf(t);
                if (idx2 >= 0)
                {
                    t.onComplete = null;
                    t.easingFunc = null;
                    t.target = null;
                    
                    tweens.splice(idx2, 1);
                    if (tweens.length === 0)
                    {
                        this.tweenTargets.splice(idx, 1);
                        targetRemoved = true;
                    }
                }
                else
                {
                    throw new Error("No tween defined for this object");
                }
            }
            else
            {
                throw new Error("No tween defined for this object");
            }
        }
        else
        {
            throw new Error("No tween target defined for this object");
        }
        
        if (this.tweenTargets.length === 0)
        {
            this.activeForTweens = false;
        }
    }
    
    return targetRemoved;
};

/**
 * Removes and kills all tweens assigned to the given object.
 *
 * @method killTweensOf
 * @param o {Object} the object to remove the tween animations from
 * @return {Boolean} if any tween is found and removed from the object specified
 */
TRAVISO.MoveEngine.prototype.killTweensOf = function(o)
{
    var targetRemoved = false;
    
    var idx = this.tweenTargets.indexOf(o); 
    if (idx >= 0)
    {
        if (this.tweenTargets[idx].tweens && this.tweenTargets[idx].tweens.length > 0)
        {
            var tweens = this.tweenTargets[idx].tweens;
            for (var j=0; j < tweens.length; j++)
            {
                tweens[j].onComplete = null;
                tweens[j].easingFunc = null;
                tweens[j].target = null;
                tweens[j] = null;
            }
            this.tweenTargets[idx].tweens = null;
        }
        
        this.tweenTargets.splice(idx, 1);
        
        targetRemoved = true;
    }
    
    if (this.tweenTargets.length === 0)
    {
        this.activeForTweens = false;
    }
    
    return targetRemoved;
};

/**
 * Removes and kills all the tweens in operation currently.
 *
 * @method removeAllTweens
 */
TRAVISO.MoveEngine.prototype.removeAllTweens = function()
{
    this.activeForTweens = false;
    
    var tweens, i, j, len = this.tweenTargets.length; 
    for (i=0; i < len; i++)
    {
        tweens = this.tweenTargets[i].tweens;
        for (j=0; j < tweens.length; j++)
        {
            tweens[j].onComplete = null;
            tweens[j].easingFunc = null;
            tweens[j].target = null;
            tweens[j] = null;
        }
        this.tweenTargets[i].tweens = null;
        this.tweenTargets[i] = null;
    }
    
    this.tweenTargets = [];
};

/**
 * Adds a map-object as movable to the engine.
 *
 * @method addMovable
 * @param o {ObjectView} the map-object to add as movable
 */
TRAVISO.MoveEngine.prototype.addMovable = function(o)
{
    if (this.movables.indexOf(o) >= 0)
    {
        return;
    }
    
    this.movables[this.movables.length] = o;
    
    if (this.movables.length > 0 && !this.activeForMovables)
    {
        this.activeForMovables = true;
    }
    
    // all movables needs to have the following variables:
    // speedMagnitude, speedUnit (more to come...) 
    
    // NOTE: might be a good idea to add all necessary parameters to the object here
};

/**
 * Removes a map-object from the current movables list.
 *
 * @method removeMovable
 * @param o {ObjectView} the map-object to remove
 * @return {Boolean} if the map-object is removed
 */
TRAVISO.MoveEngine.prototype.removeMovable = function(o)
{
    var idx = this.movables.indexOf(o); 
    if (idx !== -1)
    {
        o.speedUnit = { x: 0, y: 0 };
        this.movables.splice(idx, 1);
    }
    
    if (this.movables.length === 0)
    {
        this.activeForMovables = false;
    }
    
    // TODO: might be a good idea to remove/reset all related parameters from the object here
    
    return (idx !== -1);
};

/**
 * Removes all movables.
 *
 * @method removeAllMovables
 */
TRAVISO.MoveEngine.prototype.removeAllMovables = function()
{
    this.activeForMovables = false;
    
    var len = this.movables.length; 
    for (var i=0; i < len; i++)
    {
        this.movables[i] = null;
    }
    
    this.movables = [];
};

/**
 * Changes the current path of a map-object.
 *
 * @method addNewPathToObject
 * @param o {ObjectView} the map-object to add the path to
 * @param path {Array(Object)} the new path
 * @param [speed=null] {Number} speed of the map-object to be used during movement, if not defined it uses previous speed or the MoveEngine's default speed, default null 
 */
TRAVISO.MoveEngine.prototype.addNewPathToObject = function(o, path, speed)
{
    if (o.currentPath && o.currentTarget)
    {
        path[path.length] = o.currentPath[o.currentPathStep];
    }
    o.currentPath = path;
    o.currentPathStep = o.currentPath.length - 1;
    o.speedMagnitude = speed || o.speedMagnitude || this.DEFAULT_SPEED;
};

/**
 * Prepares a map-object for movement.
 *
 * @method prepareForMove
 * @param o {ObjectView} the movable map-object
 * @param path {Array(Object)} the path for the object
 * @param [speed=null] {Number} speed of the map-object to be used during movement, if not defined it uses previous speed or the MoveEngine's default speed, default null 
 */
TRAVISO.MoveEngine.prototype.prepareForMove = function(o, path, speed)
{
    o.currentPath = path;
    o.currentPathStep = o.currentPath.length - 1;
    o.speedMagnitude = speed || o.speedMagnitude || this.DEFAULT_SPEED;
};

/**
 * Sets movement specific parameters for the map-object according to target location.
 *
 * @method setMoveParameters
 * @param o {ObjectView} the movable map-object
 * @param pos {Object} target location
 * @param pos.r {Object} the row index of the map location
 * @param pos.c {Object} the column index of the map location
 */
TRAVISO.MoveEngine.prototype.setMoveParameters = function(o, pos)
{
    var px = this.engine.getTilePosXFor(pos.r, pos.c);
    var py = this.engine.getTilePosYFor(pos.r, pos.c) + this.engine.TILE_HALF_H;
    
    o.speedUnit = TRAVISO.getUnit({ x: (px - o.position.x), y: (py - o.position.y) });
    
    o.currentTarget = { x: px, y: py };
    o.currentReachThresh = Math.ceil(Math.sqrt(o.speedUnit.x * o.speedUnit.x + o.speedUnit.y * o.speedUnit.y) * o.speedMagnitude);
};

/**
 * Returns the proper easing method to use depending on the easing id specified.
 *
 * @method getEasingFunc
 * @private
 * @param e {String} the easing id
 * @return {Function} the easing method to use
 */
TRAVISO.MoveEngine.prototype.getEasingFunc = function (e)
{
    if (e === "easeInOut" || e === "easeInOutQuad" || e === "Quad.easeInOut")
    {
        return this.easeInOutQuad;
    }
    else if (e === "easeIn" || e === "easeInQuad" || e === "Quad.easeIn")
    {
        return this.easeInQuad;
    }
    else if (e === "easeOut" || e === "easeOutQuad" || e === "Quad.easeOut")
    {
        return this.easeOutQuad;
    }
    else
    {
        return this.linearTween;
    }
};
/**
 * Linear tween calculation.
 *
 * @method linearTween
 * @private
 * @param t {Number} current time
 * @param b {Number} initial value
 * @param c {Number} differance with the target value
 * @param d {Number} total time
 * @return {Number} result of the calculation
 */
TRAVISO.MoveEngine.prototype.linearTween = function (t, b, c, d) {
    return c*t/d + b;
};
/**
 * Quadratic ease-in tween calculation.
 *
 * @method easeInQuad
 * @private
 * @param t {Number} current time
 * @param b {Number} initial value
 * @param c {Number} differance with the target value
 * @param d {Number} total time
 * @return {Number} result of the calculation
 */
TRAVISO.MoveEngine.prototype.easeInQuad = function (t, b, c, d) {
    t /= d;
    return c*t*t + b;
};
/**
 * Quadratic ease-out tween calculation.
 *
 * @method easeOutQuad
 * @private
 * @param t {Number} current time
 * @param b {Number} initial value
 * @param c {Number} differance with the target value
 * @param d {Number} total time
 * @return {Number} result of the calculation
 */
TRAVISO.MoveEngine.prototype.easeOutQuad = function (t, b, c, d) {
    t /= d;
    return -c * t*(t-2) + b;
};
/**
 * Quadratic ease-in-out tween calculation.
 *
 * @method easeInOutQuad
 * @private
 * @param t {Number} current time
 * @param b {Number} initial value
 * @param c {Number} differance with the target value
 * @param d {Number} total time
 * @return {Number} result of the calculation
 */
TRAVISO.MoveEngine.prototype.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) { return c/2*t*t + b; }
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};

/**
 * Methid that precesses a single frame.
 *
 * @method run
 * @private
 */
TRAVISO.MoveEngine.prototype.run = function()
{
    // NOTE: Write an alternative with a real time driven animator 
    
    if (this.processFrame)
    {
        var len, o, i;
        if (this.activeForMovables)
        {
            len = this.movables.length;
            
            var dist; 
            for (i=0; i < len; i++)
            {
                o = this.movables[i];
                
                // move object
                
                // speed vector (magnitude and direction)
                
                o.prevPosition = { x: o.position.x, y: o.position.y };
                
                // check for target reach
                if (o.currentTarget)
                {
                    dist = TRAVISO.getDist(o.position, o.currentTarget);
                    if (dist <= o.currentReachThresh)
                    {
                        // reached to the target
                        o.position.x = o.currentTarget.x;
                        o.position.y = o.currentTarget.y;
                        
                        this.engine.onObjMoveStepEnd(o);
                        i--; len--;
                        continue; 
                    }
                }
                
                o.position.x += o.speedMagnitude * o.speedUnit.x;
                o.position.y += o.speedMagnitude * o.speedUnit.y;
                
                // check for tile change
                this.engine.checkForTileChange(o);
                this.engine.checkForFollowCharacter(o);
                
                // check for direction change
                
            }
            
            // will need a different loop to process crashes 
            // for (i=0; i < len; i++)
            // {
                // o = this.movables[i];
            // }
        }
        
        if (this.activeForTweens)
        {   
            // and a loop for tween animations
            len = this.tweenTargets.length;
            var t, tweens, j, vars;
            for (i=0; i < len; i++)
            {
                o = this.tweenTargets[i];
                tweens = o.tweens;
                for (j=0; j < tweens.length; j++)
                {
                    t = tweens[j];
                    t.currentFrame++;
                    vars = t.vars;
                    for (var prop in vars)
                    {
                        o[prop] = t.easingFunc(t.currentFrame, vars[prop].b, vars[prop].c, t.totalFrames);
                    }
                    
                    if (t.currentFrame >= t.totalFrames)
                    {
                        if (t.onComplete) { t.onComplete(); }
                        if (this.removeTween(o, t)) 
                        {
                            i--; len--;
                        }
                        j--;
                    }
                }
            }
        }
    }
};

/**
 * Clears all references and stops all animations and tweens.
 *
 * @method destroy
 */
TRAVISO.MoveEngine.prototype.destroy = function() 
{
    TRAVISO.trace("MoveEngine destroy");
    
    this.processFrame = false;

    if (this.ticker) { this.ticker.stop(); }
    
    this.removeAllMovables();
    this.removeAllTweens();
    this.movables = null;
    this.tweenTargets = null;
    this.engine = null;
    this.ticker = null;
};
