---
title: "CSS animations on SVG Tutorial"
category: process
tags: tutorial, animation, code, CSS, SVG
author: [ariane]
masthead: introduction.png
published: false
---

Animations on the web can be beautiful and useful. They can entertain, set a focus, or engage users to improve user experiences. They are also powerful to increase usability when providing visual feedback, for instance when communicating progress in an interface, a status change, or navigation marks. Several methods are available to produce and display animations for the web. When picking a technology, aside from the style, the transitions, and the effects it allows, you should consider performances like loading time, quality at different scales, and browsers and devices compatibilities. **Flash** is deprecated. We love **GIFs** but they can be quite tedious to build and heavy to load because they use sequences of raster images. **WebGL**, a Javascript API, is a nice solution for interactive 3D graphics. **Javascript**  making complex animations and plenty of interactions but require some code learning.

This post focuses on animating **SVG** with **CSS animations** and a little of **HTML**. HTML5 and CSS3 make it easy to create simple animations with a small number of steps. This technique is commonly used to animate logos, illustrations, and icons. It is also popular to animate a vectorial image on hover. CSS gives an easy way to control and tweak some time features like keyframes, duration, iteration, easing, or delay. CSS animation easily let you create transform animations like rotations, translations, scaling, and skewing or other simple animations like changing color and opacity, as well as animating a stroke path. CSS is not the best tool to make photo-realistic organic effects, or for designing a long and complex sequence of interactions.

The main advantage of CSS animations is that they run smoothly on most computer and mobile modern browsers. They are legible, and future-proof because they belong to W3C standard. They don't require Javascript but they are compatible with it. Some libraries can help you set-up your own animations such as [Animate CSS](https://daneden.github.io/animate.css/), [Magic Animations](https://www.minimamente.com/example/magic_animations/), and [Hover CSS](http://ianlunn.github.io/Hover/). Be warned that multiple animations on a single page can slow down the loading time, that options for animations are limited, and that some transitions are still fairly new and experimental so some browsers do not support them. For instance, IE and Android browsers below 2.3 does not support all properties.

This tutorial is an introduction to the basics of SVG animation with HTML and CSS. You may want to reproduce the small examples for reference before trying to build something more interesting.

By the end of this tutorial, you should:

1. get a better idea of what CSS animations are capable of
2. be able to create simple CSS animations
3. be able to edit keyframes to adjust your animation

Note that all the code blocks below in this tutorial are CSS snippets.

## Getting started

### SVG

SVG stand for Scalable Vector Graphics. It is a 2D vector image format therefore, it looks sharp at any resolution. The vectorial shapes and paths, and their attributes like color or stroke weight, are defined in a XML text file. That is why, they are easy to modify and to manipulate with code. SVG are constructed within the browsers, reducing the network response time.

To create and export an artwork in SVG format, you can use the two most popular tools [Illustrator](https://www.adobe.com/fr/products/illustrator.html) or [Sketch](https://www.sketchapp.com/), or you can opt for the free and open source one [InkScape](https://inkscape.org/en/).

Here some pro-tips for when you are making the drawing in the software:

*  Pixel align elements when possible (avoid decimal numbers for size or position)
*  Keep a minimum number of anchor points
*  Remove unneeded overlaps (the Pathfinder is your friend)
*  Fit your artboard to artwork bound
*  Create and name Graphic Styles for fill and stroke attributes
*  Organize layers and groups
*  Name elements
*  Export in SVG 1.1


Now open your SVG file in a code editor such as [Atom](https://www.sketchapp.com/).

*  Delete unnecessary comments or pieces of code
*  If you made graphic styles, move the CSS code between the `<style>` tag in a separate CSS file.
*  Make sure your artwork is wrapped in a `<svg>` tag
*  Give to shapes like `<circle>` or `<rectangle>`, to paths `<path>`, and to groups `<g>` you want to animate `<class>` names. Therefore, you will
be able to target these elements in the CSS. Using `<id>` is not recommended, because if an element is used more than once in the page, this invalidates the HTML.

Now your SVG is animation-ready. Here is how my SVG looks like in code and visually. You may notice that graphic styles names are stored in `<class>` names as well as the names I have given to the two `<path>` I'd like to animate.

        <svg version="1.1" id="artwork" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
        <path class="bg warmgrey10" d="M0,0h800v300H0V0z"/>
        <path class="diamond tulip" d="M400,280l-90-130l90-130l90,130L400,280z"/>
        </svg>

![Placeholder](05-11-animtut/placeholder.svg)


### HTML + CSS

To use a metaphor, HTML and CSS are like Russian dolls. HTML describes the number of dolls as well as the order in which they contains each others. CSS defines all the styles attributes like each doll size, and the decorative painting on the dolls.
HTML is the acronym of HyperText Markup Language. It is a plaintext that specifies the structure of a webpage. Most elements are wrapped in opening and closing tags made of brackets like `<div> </div>`.

CSS stand for Cascading Style Sheets. It is used to control how web pages look in the browser. CSS allow styling HTML elements or other
languages like SVG or XML. Regarding the syntax, CSS rules consist of a selector to target an element to style and a property with its associated value to define the element’s style.

In order to style SVG elements, you have two choice. Either placing the `<style>` tag inline in your svg code, or keeping the CSS code in an external stylesheet and link to it in the HMTL. In the examples of this tutorial, the second method is used so the CSS file is linked to the HTML file like so `<link rel="stylesheet" type="text/css" href="style.css">`.

The two best ways to add your SVG code to your web project for CSS animation are to place the `<svg>` tag inline in your svg code, or use the `<object>` tag in an external svg file. These two methods of insertion permit manipulation with CSS (and JS).

![Placeholder](05-11-animtut/placeholder.svg
<!--Image and code of one SVG diamond goes here-->


## Getting started with animations

CSS animations have two main parts:
1.  Referencing the animation to an HTML or SVG element(s)
2.  Defining at what moment in time what action should be performed-->

### 1. Referencing

        .diamond{
        animation-name: diamondMoves;
        }

        @keyframes diamondMoves {
        }

In your CSS, after your class name selector, and within `{}` write the property `animation-name:` and add a name for your animation. You can use letters, numbers, underscores and dashes.

### 2. Keyframes


        @keyframes diamondMoves {
          from {transform: translateX(0);}
          to {transform: translateX(400px);}
        }

        @keyframes diamondMoves {
          0% {transform: translateX(0);}
          50% {transform: translateX(100px);}
          100% {transform: translateX(400px);}
        }

The `@Keyframes` function contains a list of all the steps along the whole animation sequence. The individual list item controls the aspect of the target element at a given time. Each, element of the list, or keyframe rule, contains a time stamp followed by a property to apply.

As shown in the example, to indicate the state of the target at the beginning and at the end of an animation, you can use the keywords `from` and `to`. They are equivalent to `0%` and `100%`. As the second snippet shows, you can add as many keyframes as you need in between the start and the end steps.

These steps actions play at different times depending on the total duration of an animation that is described by another property.

### 3. Duration

        .diamond{
        animation-name: diamondMoves;
        animation-duration: 6s;
        }

The `animation-duration` property specifies the length of time that an animation takes to complete one cycle.

The duration cycle can be specified in seconds `s` or in milliseconds `ms`.

The initial value is `0s`.

### 4. Iteration

        .diamond{
        animation-name: diamondMoves;
        animation-duration: 6s;
        animation-iteration-count: 1;
        }

The `animation-iteration` property specifies the number of times an animation cycle should be played before stopping.

The possible values are:

* an entier or a decimal number like `0,5` or `1`
* the keyword `infinite` to have the animation repeats forever.


The initial value is `1`.

### 5. Easing

        .diamond{
        animation-name: diamondMoves;
        animation-duration: 6s;
        animation-iteration-count: 1;
        animation-time-function: linear;
        }

The `animation-easing` property specifies how the animation progresses over the duration of each cycle. It can be specified on individual keyframes.

The possible values are:
* keywords : `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`, `step-start`, `step-end`
* Functions like : `frames(10)`.

The initial value is `ease`.

### 6. Delay

        .diamond{
        animation-name: diamondMoves;
        animation-duration: 6s;
        animation-iteration-count: 1;
        animation-time-function: linear;
        animation-delay: 4s;
        }

The `animation-delay` property specifies when an animation should start.

The time offset can be specified in seconds `s` or in milliseconds `ms`.

The initial value is `0s`.


## CSS transform animations

CSS transform animations include rotation, translation, scaling, and skewing. We will see in this part, for each of these transform animations, one example, a definition of the animation, and its possible values. Several translations can be chained one after the other. When translations and rotations are chained, they are additive but skewing is not.

The origin point of an SVG element is located at 0, 0 of the artwork. It means that, by default, the reference point around which the transformation is applied is the top left corner and not in the center of the artwork. However, CSS `transform-origin` property lets you change the position of this origin point.

The `transform-origin` property can be defined by one, two, or three values. The first value is by default to the `x-offset`, the second value is for the `y-offset`, and if there is a third value, it always represents the Z offset.

Possible values are:
* a length expressed in `px` or in `cm` like `2px`
* keywords or their corresponding percentages written : `left` or `0%` , `right` or `100%`, `top` or `0%`, `bottom` or `100%`, and `center` or `50%`. If a Z offset is specified, it can only accept a length.

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


In this example, `transform-origin: 50% 50%;` is added. The origin point is set to the center so the diamond rotates from its center.

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

The `rotate` animation moves an object circularly around an origin point.

The property can use either one, two, or three values if you want to rotate along the Z axis.

Possible values are:
* `x`, `y`, or `z` to name the axis you want to rotate the element around.
* `<angle>` to specify the amount of rotation. The angle value can expressed in degree like `90deg`, in turn from `0` to `1` like `0.25 turn`, or in radius like `1.64rad`.

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

The `translate` animation moves an object in space from a point to another based on the coordinate given along the abscissa and the ordinate axis.
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

The `scale` animation resizes an object. Scaling can keep the ration intact, or it can distort the object ratio if the the horizontal and vertical scaling are different.

The expression can use one, two, or three values if you want to scale your object along the Z axis. It can be written `scale(sx)`, `scale(sx, sy)`, or `scale(sx, sy, sz)`, where `s` is your own entier or decimal number ranging from 0 to 1.

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

The `skew` animation transforms an object along an oblique angle. It distorts each point by a certain angle in the horizontal and vertical directions. The greater the value is, the most distorted will be the object.

The expression can use one or two values. Each value represents the amount of skewing in one direction. It can be written `skew(ax)`, `skew(ax, ay)`, `skewX(a)`, or `skewY(a)`, where `a` is an `<angle>`.
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

The `fill-mode` animation can have four different values: `none`, `forwards`, `backwards`, and `both`. With `forwards`, the target remembers
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

The `stroke` defines the color attributes of an element outline.

Possible values:
* for the stroke color - keywords like `red`, color code like RGB like `example`, RGBA `example` or Hex like `example`.
* for the stroke style - <!--write here-->
* for the stroke weight - <!--write here-->

The default value for the `stroke` attribute is `none`.

The `stroke-dasharray` <!--write about other expressions With added keywords, the expression can also affect other attributes of the stroke like its style, or its width.-->
The `stroke-dashoffset` <!--write about other expressions-->

* for the stroke dash array - <!--write here-->
* for the stroke dash offset - <!--write here-->

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

The `opacity`attribute defines the transparency of an element.

The possible values for the amount of transparency are written by a entier or decimal number from `0` to `1`, or with a percentage like `50%`.`

        .diamond {
            opacity: 0.3;
        }

![Placeholder](05-11-animtut/placeholder.svg)

### Color

The `color` speaks for itself as it defines the color fill of an element.

The Possible values for the colors fill are keywords like `red`, color code like RGB like `example`, RGBA `example` or Hex like `example`.

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
forth.

The `animation-direction` has has four different values: `normal`, `reverse`, `alternate`, and `alternate-reverse`.

The initial value is `normal`.

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

Hover states indicate to web page visitor using a pointing device that an element is interactive. It would be nice to not forget mobile devices users and to also indicate that an element is tappable on mobile view. I personally like hover state that are clear enough to indicate what elements are interactive but that are not too overwhelming. I am not a big fan of the giant and bold explosions that appear on some websites because they can be distracting.

Find below an example of how we animated hover states with CSS transitions on [to icon](https://www.toicon.com/) (where we share high quality icons series for free).  

        .yourTargetElement {
            animation-name: yourAnimationName;
            animation-duration: 6s;
            animation-iteration-count: 1;
            animation-time-function: linear;
            transform-origin: 50% 50%;
        }

![Placeholder](05-11-animtut/placeholder.svg)

### Logo animations

There are some very nice stroke animated logos on the web. I personally really like the hand drawn ones because they feel unique and personal. I am not so convinced by horizontal rotating logos because they seem a bit retro. But well, after all, isn't the 90's style back?

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

We hope this tutorial helped you to get a basic understanding of CSS animations and what they are capable of, that you can now create simple CSS animations and adjust them to your preference by tweaking keyframes. CSS gives an easy way to control some time features like keyframes, duration, iteration, easing, and delay. They easily allows to transform an SVG element with rotations, translations, scaling, and skewing. Changing color and opacity styles, and animating a stroke are also made easy with quite straightforward expressions. CSS animations are not made for photo-realistic organic effects, or for designing a complex sequence of interactions but you can already play around with what has been implemented.

We wish you a very good luck to create your own beautiful and useful CSS animation on SVGs. Don't hesitate to send us your feedback on this tutorial, or to share your CSS animation creations!
