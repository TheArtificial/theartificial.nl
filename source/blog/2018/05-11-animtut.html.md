---
title: "CSS animations on SVG Tutorial"
category: process
tags: tutorial, animation, code, CSS, SVG
author: [ariane]
masthead: introduction.png
published: false
---

Animations on the web can be beautiful and useful. They can entertain, set a focus, or engage users to improve user experiences. They are also powerful to increase usability when providing visual feedback, for instance when communicating progress in an interface, a status change, or navigation marks. If you are looking to create an animation for the web, aside from the style, the transitions, and the effects, you should consider performances like loading time, quality at different scales, and browsers and devices compatibility. Which method of animation would be the most appropriate to produce and display your artwork on the web? **Flash** is deprecated. We love **GIFs** but they can be quite tedious to create and heavy to load because they use sequences of raster images. **WebGL**, a Javascript API, is a nice solution for interactive 3D graphics. **Javascript** allows making large and complex animations, plus they allow plenty of interactions.

This post will focus on animating **SVG** with **CSS animations**. HTML5 and CSS3 make it easy to create simple animations with a small number of steps. This technique is mainly used to animate logos, illustrations and icons. It is also popular to animate a vectorial image on hover. CSS gives an easy way to control and tweak some time features like keyframes, duration, iteration, easing or delay. CSS animation easily allows to create 2D transform animations like rotations, translations, scaling, and skewing. Changing color and opacity styles as well as animating a stroke are easy. CSS animations are not made for photo-realistic organic effects, or for designing a complex sequence of interactions.

The main advantages of CSS animation is that they are light so they run smoothly on most computer and mobile modern browsers. They are legible, and future proof because they belong to W3C standard. They don't require Javascript but they are compatible with it. Some libraries can help you set-up your own animations such as [Animate CSS](http://.html), [Magic Animations](http://.html), and [Hover CSS](http://.html). Be warned that multiple animations on a single page can slow down the loading time, that options for animations are limited, and that IE and Android browsers below 2.3 does not support all properties.

This tutorial is an introduction to the basics of SVG animation with HTML and CSS. You may want to reproduce the small examples for reference before trying to build something more interesting.

By the end of this tutorial, you should:
1. have a better idea on what CSS animations are capable of
2. be able to create simple CSS animations
3. be able to edit keyframes to adjust your animation

Kind note to the reader, all the code blocks in this tutorial are CSS.

## Getting started

### SVG

SVG stand for Scalable Vector Graphics. It is a 2D vector image format that looks sharp at any resolution. The vectorial shapes and paths, and their attributes like color or stroke weight, are defined in XML text files. That is why, they are easy to modify and to manipulate with code. SVG are constructed within the browsers, reducing the network response time.

To create and export an artwork in SVG format, you can use the two most popular tools [Illustrator](https://www.adobe.com/fr/products/illustrator.html) or [Sketch](https://www.sketchapp.com/), or you can opt for the free and open source one [InkScape](https://inkscape.org/en/).

While making the drawing in the software :

*  Pixel align elements when possible (avoid decimal numbers for size or position)
*  Keep a minimum number of anchor points
*  Remove unneeded overlap (the Pathfinder is your friend)
*  Fit your artboard to artwork bound
*  Organize layers and groups
*  Name elements
*  Export in SVG 1.1


If you follow these pro tips, your artwork is almost animation-ready. Now you should open the SVG in a code editor like [Atom](https://www.sketchapp.com/).

*  Make sure your artwork is wrapped in a `<svg>` tag
*  Create Graphic Styles
*  Give to the shapes `<circle>`, paths `<path>`, or groups `<g>` you want to animate `<class>` names. Therefore, you will
be able to target these elements in the CSS. `<id>` are not the best idea, because if an element is used more than once in the page, this invalidates the HTML.

Now your SVG is animation-ready. Here is how my SVG looks like in code and visually. You may notice that my graphic styles names are stored in `<class>` names as well as the names I have given to the two `<path>` I'd like to animate.

        <svg version="1.1" id="artwork" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
        <path class="bg warmgrey10" d="M0,0h800v300H0V0z"/>
        <path class="diamond tulip" d="M400,280l-90-130l90-130l90,130L400,280z"/>
        </svg>

![Placeholder](05-11-animtut/placeholder.svg)


### HTML + CSS

To use a metaphor, HTML is like all the shapes of Russian dolls, and CSS is the painting and decorations on the dolls.
HTML is the acronym of HyperText Markup Language. It is a plaintext that specifies the structure of a webpage. Most elements are wrapped in opening and closing tags made of brackets like `<div> </div>`.

CSS stand for Cascading Style Sheets. It is used to control how web pages look in the browser. CSS allow styling HTML elements or other
languages like SVG or XML. Regarding the syntax, CSS rules consist of a selector to target an element to style and a property with its associated value to define the element’s style.

In order to style SVG elements, you have two choice. Either placing the `<style>` tag inline in your svg code, or externally linking in a stylesheet. I personally prefer the second option to keep the CSS in a distinct file. The CSS file is linked to your HTML file like so `<link rel="stylesheet" type="text/css" href="style.css">`. To style your SVG, you can use the same CSS file, or a separate one.

The two best ways to add your SVG code to your web project for animation are placing the `<svg>` tag inline in your svg code, or using the `<object>` tag in an external svg file. These two methods allow manipulation with css (and JS).

![Placeholder](05-11-animtut/placeholder.svg)
<!--Image and code of one SVG diamond goes here-->


## Getting started with animations

<!--CSS animations have two main parts:
1.  Referencing the animation to an HTML or SVG element(s)
2.  Defining at what moment in time what action should be performed-->

### 1. Referencing

        .diamond{
        animation-name: diamondMoves;
        }

        @keyframes diamondMoves {
        }

In your CSS, after your class name selector, and within `{}` add the property `animation-name:` and pick a name for your animation. Choose one or more keywords that make sense. You can use letters, numbers, underscores and dashes.

### 2. Keyframes

From beginning to end

        @keyframes diamondMoves {
          from {transform: translateX(0);}
          to {transform: translateX(400px);}
        }


or

        @keyframes diamondMoves {
          0% {transform: translateX(0);}
          100% {transform: translateX(400px);}
        }

More in-between keyframes

        @keyframes diamondMoves {
          0% {transform: translateX(0);}
          50% {transform: translateX(100px);}
          100% {transform: translateX(400px);}
        }

Keyframes control the aspect of an element at a given time. It defines styles at different steps along the whole animation sequence.

Each keyframe rule contains a list of keyframe selectors in percentage. Since the timing of animation is defined in the CSS, the percentage
of the keyframe indicates at what time the animation should take place. 0% is the beginning of the animation duration and 100% is the end.

As shown in the example, to determine the beginning and the end of an animation you can use `from` and `to` that are equivalent to `0%` and `100%`. You can use as many keyframes as you need. Any percentage also works.

### 3. Duration property

        .diamond{
        animation-name: diamondMoves;
        animation-duration: 6s;
        }

The animation duration property specifies the length of time that an animation should take to complete one cycle.
The duration cycle can be specified in either seconds `s` or in milliseconds `ms`.
The initial value is `0s`.

### 4. Iteration property

        .diamond{
        animation-name: diamondMoves;
        animation-duration: 6s;
        animation-iteration-count: 1;
        }

The animation iteration property specifies the number of times an animation cycle should be played before stopping.
The possible values are `infinite` so it repeats forever, or a number like `0,5` or `1`.
The initial value is `1`.

### 5. Easing property

        .diamond{
        animation-name: diamondMoves;
        animation-duration: 6s;
        animation-iteration-count: 1;
        animation-time-function: linear;
        }

The animation easing property specifies how the animation should progress over the duration of each cycle. It can be specified on individual keyframes.
The possible values are `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`, `step-start`, `step-end`. It can also contain functions like
`frames(10)`.
The initial value is: `ease`.

### 6. Delay property

        .diamond{
        animation-name: diamondMoves;
        animation-duration: 6s;
        animation-iteration-count: 1;
        animation-time-function: linear;
        animation-delay: 4s;
        }

The animation delay property specifies when an animation should start.
The time offset can be specified in either seconds `s` or in milliseconds `ms`.
The initial value is `0s`.


## CSS transform animations

CSS transform animations include rotation, translation, scaling, and skewing. We will see in this part, for each of these animation, one example, a definition of the animation, and its possible values. Note is that when several translations can be chained one after the other. When translations and rotations are chained, they are additive but skewing is not additive.

It is very important to note that the origin point of SVG element is located at 0, 0 of the canvas. It means that, by default, the reference point around which the transformation is applied is the top left corner of the canvas and not in the center of the artwork. However, CSS `transform-origin` property allows changing the position of this origin point.

`transform-origin` property can be defined by either one, two, or three values. The first value is by default to the `x-offset`, the second value is for the `y-offset`, and if there is a third value, it always represents the Z offset. Possible values are a length expressed in `px` or in `cm` like `2px`, or keywords or their corresponding percentage like `left` or `0%` , `right` or `100%`, `top` or `0%`, `bottom` or `100%`, and `center` or `50%`. If a Z offset is specified, it can only accept a length.

In this example, the diamond rotates from its default origin point, in the top left corner.

        .diamond{
        animation-name: diamondTurns;
        animation-duration: 4s;
        animation-iteration-count: infinite;
        animation-time-function: linear;
        }

        @keyframes diamondTurns {
          from {transform: rotate(0deg);}
          to {transform: rotate(45deg);}
        }

![Placeholder](05-11-animtut/placeholder.svg)


In this example, `transform-origin: 50% 50%;` is added so the diamond rotates from its center. The origin point is set to the center.

        .diamond{
        animation-name: diamondTurns;
        animation-duration: 4s;
        animation-iteration-count: infinite;
        animation-time-function: linear;
        transform-origin: 50% 50%;
        }

        @keyframes diamondTurns {
          from {transform: rotate(0deg);}
          to {transform: rotate(45deg);}
        }

![Placeholder](05-11-animtut/placeholder.svg)


### Rotate

The rotation animation moves an object circularly around an origin point.
The syntax can use one, two, or three values if you want to rotate along the Z axis.
Possible values are:
* `x`, `y`, or `z` to name the axis you want to rotate the element around.
* `<angle>` to specify the amount of rotation in degree like `90deg`, in turn from `0` to `1` like `0.25 turn`, or with the radius like `1.64rad`.

        .diamond{
        animation-name: diamondTurns;
        animation-duration: 8s;
        animation-iteration-count: infinite;
        animation-time-function: linear;
        transform-origin: 100% 100%;
        }

        @keyframes diamondTurns {
          from {transform: rotate(0deg);}
          to {transform:
              rotate(90deg)
              translate(0, -100%)
              rotate(90deg)
              translate(0, -100%)
          ;}
        }


![Placeholder](05-11-animtut/placeholder.svg)

### Translate

The translate animation moves an object in space from a point to another based on the coordinate given along the abscissa and the ordinate axis.
The syntax can use one, two, or three values if you want to move your object along the Z axis. It can be written `translate(tx)` or `translate(tx, ty)`, `translate(tz)`.
Values are specified in lengths in `px` or in `%`. If `t` is unspecified, its default value is `0`.

        .diamond{
        animation-name: diamondMoves;
        animation-duration: 4s;
        animation-iteration-count: infinite;
        animation-time-function: ease-in;
        transform-origin: 50% 50%;
        }

        @keyframes diamondMoves {
          from {transform: translateY(300px);}
          to {transform: translateY(0px);}
        }

![Placeholder](05-11-animtut/placeholder.svg)

### Scale

The scale animation resize an object. Scaling can be uniform and keep the ration intact, or it can distort the object ratio if the the horizontal and vertical scaling are different. The syntax can use one, two, or three values if you want to scale your object along the Z axis. It can be written `scale(sx)`, `scale(sx, sy)`, or `scale(sx, sy, sz)`, where `s` is your own variable number ranging from 0 to 1.

        .diamond{
        animation-name: diamondShrinks;
        animation-duration: 4s;
        animation-iteration-count: infinite;
        animation-time-function: ease-out;
        transform-origin: 50% 50%;
        }

        @keyframes diamondShrinks {
          from {transform: scale(1);}
          to {transform: scale(0,5);}
        }

![Placeholder](05-11-animtut/placeholder.svg)

### Skew

The skew animation transforms an object with an oblique angle. It distorts each point by a certain angle in the horizontal and vertical directions. The greater the value is, the most distorted will be the object. The syntax can use one or two values. Each value represent the amount of skewing in each direction. It can be written `skew(ax)`, `skew(ax, ay)`, `skewX(a)`, or `skewY(a)`, where `a` is an `<angle>`.
<!--specifying the amount of rotation in degree like `90deg`, in turn from `0` to `1` like `0.25 turn`, or with the radius like `1.64rad`. VERIFY VALUES-->


        .diamond{
        animation-name: diamondSkewed;
        animation-duration: 4s;
        animation-iteration-count: infinite;
        animation-time-function: ease-out;
        transform-origin: 50% 50%;
        }

        @keyframes diamondSkewed {
          from {transform: skew(0deg, 0deg);}
          to {transform: skew(10deg, 10deg);}
        }

![Placeholder](05-11-animtut/placeholder.svg)


## Other CSS animations

Aside from transform properties, CSS animation also include fill, stroke, opacity, color, and direction animations. We will see in this part, for each of these animation, one example, a definition of the animation, and its possible values.

### Fill
The `fill-mode` property specifies styles before and after the animation execution.
The fill mode animation can have four different values: `none`, `forwards`, `backwards`, and `both`. With `forwards`, the target remembers
the last keyframe played in the execution. `Forwards` can be influenced by `animation-direction` and `animation-iteration-count`. `Backwards` applies the value of the first keyframe when it is applied to the target. It is influenced by `animation-delay` and `animation-direction`.
The initial value is `none`.

        .diamond {
            animation-name: diamondBackwardColor;
            animation-duration: 6s;
            animation-iteration-count: 1;
            animation-time-function: linear;
            transform-origin: 50% 50%;
            animation-fill-mode: backwards;
        }

![Placeholder](05-11-animtut/placeholder.svg)

### Stroke

The `stroke` defines the color attributes of an element outline. With added keywords, the expression can also affect other attributes of the stroke like its style, or its width. The default value for the stroke attribute is `none`. Possible values for the colors are keywords, or a color code like RGB, RGBA or Hex.

        .diamond{
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
         	animation: dash 5s linear forwards;
        }
        @keyframes dash {
          to { stroke-dashoffset: 0;
          }

![Placeholder](05-11-animtut/placeholder.svg)

### Opacity

The `opacity`attribute defines the transparency of an element. The amount of transparency can be written by a number from `0` to `1`, or with percentage like `50%`.`

        .diamond {
            opacity: 0.3;
        }

![Placeholder](05-11-animtut/placeholder.svg)

### Color

The `color` speaks for itself as it defines the color attributes of an element outline. Possible values for the colors are keywords, or a color code like RGB, RGBA or Hex.


        .yourTargetElement {
            animation-name: yourAnimationName;
            animation-duration: 6s;
            animation-iteration-count: 1;
            animation-time-function: linear;
            transform-origin: 50% 50%;
        }

![Placeholder](05-11-animtut/placeholder.svg)

### Direction

The `animation-direction` property specifies whether an animation should play forwards, backwards, or alternating back and
forth. It has has four different values: `normal`, `reverse`, `alternate`, and `alternate-reverse`. The initial value is `normal`.

        .yourTargetElement {
            animation-name: diamondReverses;
            animation-duration: 6s;
            animation-iteration-count: 1;
            animation-time-function: linear;
            transform-origin: 50% 50%;
            animation-direction: reverse;
        }

![Placeholder](05-11-animtut/placeholder.svg)


## CSS animations common use

### Hover states

Hover states indicate to the visitor of the web page using a pointing device like a mouse that an element is interactive. It would be nice to not forget mobile devices users and to also indicate that an element is tappable on mobile view. I personally like hover state that are clear enough to indicate something will happen if the user taps or clicks on the target but that are not too overwhelming. I am not a big fan of the giant and bold explosions that appears on some websites because they are distracting.

Find below an example of how we animated hover states with CSS transitions on [to icon](https://www.toicon.com/) website (where we share high quality icons series for free).  

        .yourTargetElement {
            animation-name: yourAnimationName;
            animation-duration: 6s;
            animation-iteration-count: 1;
            animation-time-function: linear;
            transform-origin: 50% 50%;
        }

![Placeholder](05-11-animtut/placeholder.svg)

### Logo animations

I have seen on the web nice stroke animation logo. I personally really like the hand drawn ones. They feel personal. I am not so convinced by the rotating logo because they seem a bit retro to me. After all, the 90's style is back.

        .yourTargetElement {
            animation-name: yourAnimationName;
            animation-duration: 6s;
            animation-iteration-count: 1;
            animation-time-function: linear;
            transform-origin: 50% 50%;
        }

![Placeholder](05-11-animtut/placeholder.svg)

### Illustrated animations

I think that animations that work best are animated line drawings, looping figurative sceneries with an atmosphere, or looping geometrical animations. Sometimes, I stare at these for a few minutes because they can be mesmerizing.

        .yourTargetElement {
            animation-name: yourAnimationName;
            animation-duration: 6s;
            animation-iteration-count: 1;
            animation-time-function: linear;
            transform-origin: 50% 50%;
        }

![Placeholder](05-11-animtut/placeholder.svg)


## Conclusion

We hope this tutorial helped you to get a basic understanding of CSS animations and what they are capable of, that you can now create simple CSS animations and adjust them to your preference by tweaking keyframes. CSS gives an easy way to control some time features like keyframes, duration, iteration, easing or delay. CSS animation easily allows to create transform animations like rotations, translations, scaling, and skewing. Changing color and opacity styles as well as animating a stroke are easy. CSS animations are not made for photo-realistic organic effects, or for designing a complex sequence of interactions.

We wish you a very good luck to create beautiful and useful CSS animation on SVGs. Don't hesitate to send us your feedback on this tutorial, or to share your CSS animation creations!
