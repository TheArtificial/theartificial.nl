---
title: "CSS animations on SVG Tutorial"
category: process
tags: tutorial, animation, code, CSS, SVG
author: [ariane]
masthead: introduction.png
published: false
---

Animation on the web is hardly new. First there were GIFs, then there was Flash, now there's HTML5 and JavaScript and GIFs are retro cool. These techniques are great if you want to create dynamic web pages or small raster graphics. But what if you want to create a vector animation that's lightweight, scales well, and has [broad compatibility](https://caniuse.com/#search=css%20animation)? These circumstances are ideal for animating SVGs with CSS.

This tutorial is an introduction to the basics of SVG animation with CSS. We'll start with the basics before moving on to some samples that utilize multiple techniques. By the end of this tutorial, you will have the foundation to create complex animations.

## Getting started

### SVG

Scalable Vector Graphics or SVG is a 2D vector image format that scales to look sharp at any resolution. SVG and HTML are compatible with each other, and this means that SVGs, just like HTML, are easy to modify and manipulate with CSS.

To create an SVG, you can use design tools like [Illustrator](https://www.adobe.com/fr/products/illustrator.html), [Sketch](https://www.sketchapp.com/), or [InkScape](https://inkscape.org/en/), or you can write SVG directly using the text editor of your choice.

If you're using a design tool, make sure you:

*  Pixel align elements when possible (avoid decimals for size or position)
*  Avoid unnecessary anchor points
*  Avoid overlapping elements
*  Create your image completely within the artboard
*  Export SVG 1.1

If you follow these pro tips, your artwork is almost animation-ready, but you'll still need to clean up your SVG using a text editor.
In your text editor:

*  Give shapes, paths, and groups you want to animate unique **class** names
*  Make sure your styles are defined within the **style** tags (and not on elements themselves)

To keep things simple in this tutorial, all CSS styles will be contained within our SVG. These styles could also live independently in their own CSS file.

--
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


<!--Image and code of one SVG diamond goes here-->


## Getting started with animations

CSS animations have two main parts:
1.  Referencing the animation to an HTML or SVG element(s)
2.  Defining at what moment in time what action should be performed

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

The `animation-iteration-count` property specifies the number of times an animation cycle should be played before stopping.

The possible values are:

* a whole number (integer) or a decimal number like `0,5` or `1`
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

        <div id="origin" class="anim">
        	<?xml version="1.0" encoding="utf-8"?>
        	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
        		<path class="diamond tulip" d="M400,280l-90-130l90-130l90,130L400,280z"/>
        		<style>
        			.anim {
        			  background-color:#E5E4E3;
        			}
        			.diamond {
        				  animation-name: diamondOrigin;
        				  animation-duration: 6s;
        				  animation-iteration-count: infinite;
        				}

        				@keyframes diamondOrigin {
        				  from {transform: rotate(0deg);}
        				  to {transform: rotate(360deg);}
        				}
        		</style>
        	</svg>
        </div>

<div id="origin" class="anim">
	<?xml version="1.0" encoding="utf-8"?>
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
		<path class="diamond" fill="#CC2954" d="M400,280l-90-130l90-130l90,130L400,280z"/>
		<style>
			.anim {
			  background-color:#E5E4E3;
			}
			.diamond {
				  animation-name: diamondOrigin;
				  animation-duration: 6s;
				  animation-iteration-count: infinite;
				}

				@keyframes diamondOrigin {
				  from {transform: rotate(0deg);}
				  to {transform: rotate(360deg);}
				}
		</style>
	</svg>
</div>


In this example, the diamond rotates from its default origin point, in the top left corner.


        <div id="originChanged" class="anim">
        	<?xml version="1.0" encoding="utf-8"?>
        	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
        		<path class="diamondOriginChanged" fill="#CC2954" d="M400,280l-90-130l90-130l90,130L400,280z"/>
        		<style>
        			.anim {
        				background-color:#E5E4E3;
        			}
        			.diamondOriginChanged {
        			  animation-name: diamondOrigin;
        			  animation-duration: 6s;
        			  animation-iteration-count: infinite;
        			  transform-origin: 50% 50%;
        			}

        			@keyframes diamondOrigin {
        			  from {transform: rotate(0deg);}
        			  to {transform: rotate(360deg);}
        			}
        		</style>
        	</svg>
        </div>


<div id="originChanged" class="anim">
	<?xml version="1.0" encoding="utf-8"?>
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
		<path class="diamondOriginChanged tulip" fill="#CC2954" d="M400,280l-90-130l90-130l90,130L400,280z"/>
		<style>
			.anim {
				background-color:#E5E4E3;
			}
			.diamondOriginChanged {
			  animation-name: diamondOrigin;
			  animation-duration: 6s;
			  animation-iteration-count: infinite;
			  transform-origin: 50% 50%;
			}

			@keyframes diamondOrigin {
			  from {transform: rotate(0deg);}
			  to {transform: rotate(360deg);}
			}
		</style>
	</svg>
</div>


In this example, `transform-origin: 50% 50%;` is added. The origin point is set to the center so the diamond rotates from its center.


### Rotate

The `rotate` animation moves an object circularly around an origin point.

The property can use either one, two, or three values if you want to rotate along the Z axis.

Possible values are:

* `x`, `y`, or `z` to name the axis you want to rotate the element around.
* `<angle>` to specify the amount of rotation. The angle value can expressed in degree like `90deg`, in turn from `0` to `1` like `0.25 turn`, or in radius like `1.64rad`.

        <div id="turned" class="anim">
        	<?xml version="1.0" encoding="utf-8"?>
        	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
        		<path class="turn-01" fill="#7C0826" d="M400,280l-90-130l90-130l90,130L400,280z"/>
        		<path class="turn-02" fill="#CC2954" d="M400,280l-90-130l90-130l90,130L400,280z"/>
        		<path class="turn-03" fill="#CC2954" d="M400,280l-90-130l90-130l90,130L400,280z"/>
        		<path class="turn-04" fill="#F27990" d="M400,280l-90-130l90-130l90,130L400,280z"/>
        		<path class="turn-05" fill="#F2AABD" d="M400,280l-90-130l90-130l90,130L400,280z"/>

        		<style>
        			.anim {
        				background-color:#E5E4E3;
        			}
        			.turn-01, .turn-02, .turn-03, .turn-04, .turn-05, .turn-06{
        			  animation-duration: 10s;
        			  animation-iteration-count: infinite;
        			  animation-timing-function: ease-in-out;
        			  transform-origin: 50% 50%;
        			}

        			.turn-01 { animation-name: turnOne;}
        			.turn-02 { animation-name: turnTwo;}
        			.turn-03 { animation-name: turnThree;}
        			.turn-04 { animation-name: turnFour;}
        			.turn-05 { animation-name: turnFive;}

        			@keyframes turnOne {
        			  0% {transform: rotate(0deg);}
        			  100% {transform: rotate(180deg);}
        			}

        			@keyframes turnTwo {
        			  0% {transform: rotate(0deg);}
        			  100% {transform: rotate(360deg);}
        			}

        			@keyframes turnThree {
        			  0% {transform: rotate(0deg);}
        			  100% {transform: rotate(540deg);}
        			}

        			@keyframes turnFour{
        			  0% {transform: rotate(0deg);}
        			  100% {transform: rotate(720deg);}
        			}

        			@keyframes turnFive {
        			  0% {transform: rotate(0deg);}
        			  100% {transform: rotate(900deg);}
        			}
        		</style>
        	</svg>
        </div>

<div id="turned" class="anim">
	<?xml version="1.0" encoding="utf-8"?>
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
		<path class="turn-01" fill="#7C0826" d="M400,280l-90-130l90-130l90,130L400,280z"/>
		<path class="turn-02" fill="#CC2954" d="M400,280l-90-130l90-130l90,130L400,280z"/>
		<path class="turn-03" fill="#CC2954" d="M400,280l-90-130l90-130l90,130L400,280z"/>
		<path class="turn-04" fill="#F27990" d="M400,280l-90-130l90-130l90,130L400,280z"/>
		<path class="turn-05" fill="#F2AABD" d="M400,280l-90-130l90-130l90,130L400,280z"/>

		<style>
			.anim {
				background-color:#E5E4E3;
			}
			.turn-01, .turn-02, .turn-03, .turn-04, .turn-05, .turn-06{
			  animation-duration: 10s;
			  animation-iteration-count: infinite;
			  animation-timing-function: ease-in-out;
			  transform-origin: 50% 50%;
			}

			.turn-01 { animation-name: turnOne;}
			.turn-02 { animation-name: turnTwo;}
			.turn-03 { animation-name: turnThree;}
			.turn-04 { animation-name: turnFour;}
			.turn-05 { animation-name: turnFive;}

			@keyframes turnOne {
			  0% {transform: rotate(0deg);}
			  100% {transform: rotate(180deg);}
			}

			@keyframes turnTwo {
			  0% {transform: rotate(0deg);}
			  100% {transform: rotate(360deg);}
			}

			@keyframes turnThree {
			  0% {transform: rotate(0deg);}
			  100% {transform: rotate(540deg);}
			}

			@keyframes turnFour{
			  0% {transform: rotate(0deg);}
			  100% {transform: rotate(720deg);}
			}

			@keyframes turnFive {
			  0% {transform: rotate(0deg);}
			  100% {transform: rotate(900deg);}
			}
		</style>
	</svg>
</div>

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

        <div id="trans" class="anim">
        	<?xml version="1.0" encoding="utf-8"?>
        	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
        		 <path class="trans-01" fill="#CC2954" d="M400,280l-90-130l90-130l90,130L400,280z"/>
        		 <path class="trans-02" fill="#CC2954" d="M400,280l-90-130l90-130l90,130L400,280z"/>
        		 <path class="trans-03" fill="#CC2954" d="M400,280l-90-130l90-130l90,130L400,280z"/>
        		 <path class="trans-04" fill="#A51138" d="M400,280l-90-130l90-130l90,130L400,280z"/>
        		 <path class="trans-05" fill="#A51138" d="M400,280l-90-130l90-130l90,130L400,280z"/>
        		 <path class="trans-06" fill="#A51138" d="M400,280l-90-130l90-130l90,130L400,280z"/>
        		 <path class="trans-07" fill="#A51138" d="M400,280l-90-130l90-130l90,130L400,280z"/>

        		 <style>
        			 .anim {
        				 background-color:#E5E4E3;
        			 }
        			 .trans-01, .trans-02, .trans-03, .trans-04, .trans-05, .trans-06, .trans-07 {
        			   animation-duration: 2s;
        			   animation-iteration-count: infinite;
        			   animation-timing-function: linear;
        			   transform-origin: 50% 50%;
        			 }

        			 .trans-01 { animation-name: transOne;}
        			 .trans-02 { animation-name: transTwo;}
        			 .trans-03 { animation-name: transThree;}
        			 .trans-04 { animation-name: transFour;}
        			 .trans-05 { animation-name: transFive;}
        			 .trans-06 { animation-name: transSix;}
        			 .trans-07 { animation-name: transSeven;}


        			 @keyframes transTwo {
        			   0% {transform: translate(0, 0);}
        			   100% {transform: translate(200px, 0);}
        			 }

        			 @keyframes transThree {
        			   0% {transform: translate(0, 0);}
        			   100% {transform: translate(-200px, 0);}
        			 }

        			 @keyframes transFour{
        			   0% {transform: translate(0, 0);}
        			   100% {transform: translate(100px, 180px);}
        			 }

        			 @keyframes transFive {
        			   0% {transform: translateX(0);}
        			   100% {transform: translate(-100px, 180px);}
        			 }

        			 @keyframes transSix {
        			   0% {transform: translateX(0);}
        			   100% {transform: translate(-100px, -180px);}
        			 }

        			 @keyframes transSeven {
        			   0% {transform: translate(0, 0);}
        			   100% {transform: translate(100px, -180px);}
        			 }
        		 </style>
        	</svg>
        </div>

<div id="trans" class="anim">
	<?xml version="1.0" encoding="utf-8"?>
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
		 <path class="trans-01" fill="#CC2954" d="M400,280l-90-130l90-130l90,130L400,280z"/>
		 <path class="trans-02" fill="#CC2954" d="M400,280l-90-130l90-130l90,130L400,280z"/>
		 <path class="trans-03" fill="#CC2954" d="M400,280l-90-130l90-130l90,130L400,280z"/>
		 <path class="trans-04" fill="#A51138" d="M400,280l-90-130l90-130l90,130L400,280z"/>
		 <path class="trans-05" fill="#A51138" d="M400,280l-90-130l90-130l90,130L400,280z"/>
		 <path class="trans-06" fill="#A51138" d="M400,280l-90-130l90-130l90,130L400,280z"/>
		 <path class="trans-07" fill="#A51138" d="M400,280l-90-130l90-130l90,130L400,280z"/>

		 <style>
			 .anim {
				 background-color:#E5E4E3;
			 }
			 .trans-01, .trans-02, .trans-03, .trans-04, .trans-05, .trans-06, .trans-07 {
			   animation-duration: 2s;
			   animation-iteration-count: infinite;
			   animation-timing-function: linear;
			   transform-origin: 50% 50%;
			 }

			 .trans-01 { animation-name: transOne;}
			 .trans-02 { animation-name: transTwo;}
			 .trans-03 { animation-name: transThree;}
			 .trans-04 { animation-name: transFour;}
			 .trans-05 { animation-name: transFive;}
			 .trans-06 { animation-name: transSix;}
			 .trans-07 { animation-name: transSeven;}


			 @keyframes transTwo {
			   0% {transform: translate(0, 0);}
			   100% {transform: translate(200px, 0);}
			 }

			 @keyframes transThree {
			   0% {transform: translate(0, 0);}
			   100% {transform: translate(-200px, 0);}
			 }

			 @keyframes transFour{
			   0% {transform: translate(0, 0);}
			   100% {transform: translate(100px, 180px);}
			 }

			 @keyframes transFive {
			   0% {transform: translateX(0);}
			   100% {transform: translate(-100px, 180px);}
			 }

			 @keyframes transSix {
			   0% {transform: translateX(0);}
			   100% {transform: translate(-100px, -180px);}
			 }

			 @keyframes transSeven {
			   0% {transform: translate(0, 0);}
			   100% {transform: translate(100px, -180px);}
			 }
		 </style>
	</svg>
</div>

### Scale

The `scale` animation resizes an object. Scaling can keep the ration intact, or it can distort the object ratio if the the horizontal and vertical scaling are different.

The expression can use one, two, or three values if you want to scale your object along the Z axis. It can be written `scale(sx)`, `scale(sx, sy)`, or `scale(sx, sy, sz)`, where `s` is your own a whole number (integer) or decimal number ranging from 0 to 1.

        <div id="scaled" class="anim">
        	<?xml version="1.0" encoding="utf-8"?>
        	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
        		 <path class="sca-01" fill="#CC2954" d="M500,395l-45-65l45-65l45,65L500,395z"/>
        		 <path class="sca-02" fill="#CC2954" d="M500,35l-45-65l45-65l45,65L500,35z"/>
        		 <path class="sca-03" fill="#CC2954" d="M300,395l-45-65l45-65l45,65L300,395z"/>
        		 <path class="sca-04" fill="#CC2954" d="M300,35l-45-65l45-65l45,65L300,35z"/>
        		 <path class="sca-05" fill="#CC2954" d="M600,215l-45-65l45-65l45,65L600,215z"/>
        		 <path class="sca-06" fill="#CC2954" d="M200,215l-45-65l45-65l45,65L200,215z"/>
        		 <path class="sca-07" fill="#F27990" d="M400,215l-45-65l45-65l45,65L400,215z"/>

        		 <style>
        			 .anim {
        				 background-color:#E5E4E3;
        			 }
        			 .sca-01, .sca-02, .sca-03, .sca-04, .sca-05, .sca-06, .sca-07 {
        			   animation-duration: 6s;
        			   animation-iteration-count: infinite;
        			   animation-timing-function: ease-in-out;
        			   transform-origin: 50% 50%;
        			 }

        			 .sca-01 { animation-name: scaOne;}
        			 .sca-02 { animation-name: scaTwo;}
        			 .sca-03 { animation-name: scaThree;}
        			 .sca-04 { animation-name: scaFour;}
        			 .sca-05 { animation-name: scaFive;}
        			 .sca-06 { animation-name: scaSix;}
        			 .sca-07 { animation-name: scaSeven;}

        			 @keyframes scaOne {
        			   0% {transform: scale(1);}
        			   60% {transform: scale(2.5) translate(-55px, -115px);}
        				 100% {transform: scale(1);}
        			 }

        			 @keyframes scaTwo {
        			   0% {transform: scale(1);}
        			   60% {transform: scale(2.5) translate(-55px, 115px);}
        				 100% {transform: scale(1);}
        			 }

        			 @keyframes scaThree {
        				 0% {transform: scale(1);}
        			   60% {transform: scale(2.5) translate(55px, -115px);}
        				 100% {transform: scale(1);}
        			 }

        			 @keyframes scaFour {
        			   0% {transform: scale(1);}
        			   60% {transform: scale(2.5) translate(55px, 115px);}
        				 100% {transform: scale(1);}
        			 }

        			 @keyframes scaFive {
        			   0% {transform: scale(1);}
        			   60% {transform: scale(2.5) translateX(-110px);}
        				 100% {transform: scale(1);}
        			 }

        			 @keyframes scaSix {
        				 0% {transform: scale(1);}
        			   60% {transform: scale(2.5) translateX(110px);}
        				 100% {transform: scale(1);}
        			 }

        			 @keyframes scaSeven {
        			   0% {transform: scale(1);}
        			   60% {transform: scale(2.5);}
        				 90% {transform: scale(1.5);}
        				 100% {transform: scale(1);}
        			 }
        		 </style>
        	</svg>
        </div>

<div id="scaled" class="anim">
	<?xml version="1.0" encoding="utf-8"?>
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
		 <path class="sca-01" fill="#CC2954" d="M500,395l-45-65l45-65l45,65L500,395z"/>
		 <path class="sca-02" fill="#CC2954" d="M500,35l-45-65l45-65l45,65L500,35z"/>
		 <path class="sca-03" fill="#CC2954" d="M300,395l-45-65l45-65l45,65L300,395z"/>
		 <path class="sca-04" fill="#CC2954" d="M300,35l-45-65l45-65l45,65L300,35z"/>
		 <path class="sca-05" fill="#CC2954" d="M600,215l-45-65l45-65l45,65L600,215z"/>
		 <path class="sca-06" fill="#CC2954" d="M200,215l-45-65l45-65l45,65L200,215z"/>
		 <path class="sca-07" fill="#F27990" d="M400,215l-45-65l45-65l45,65L400,215z"/>

		 <style>
			 .anim {
				 background-color:#E5E4E3;
			 }
			 .sca-01, .sca-02, .sca-03, .sca-04, .sca-05, .sca-06, .sca-07 {
			   animation-duration: 6s;
			   animation-iteration-count: infinite;
			   animation-timing-function: ease-in-out;
			   transform-origin: 50% 50%;
			 }

			 .sca-01 { animation-name: scaOne;}
			 .sca-02 { animation-name: scaTwo;}
			 .sca-03 { animation-name: scaThree;}
			 .sca-04 { animation-name: scaFour;}
			 .sca-05 { animation-name: scaFive;}
			 .sca-06 { animation-name: scaSix;}
			 .sca-07 { animation-name: scaSeven;}

			 @keyframes scaOne {
			   0% {transform: scale(1);}
			   60% {transform: scale(2.5) translate(-55px, -115px);}
				 100% {transform: scale(1);}
			 }

			 @keyframes scaTwo {
			   0% {transform: scale(1);}
			   60% {transform: scale(2.5) translate(-55px, 115px);}
				 100% {transform: scale(1);}
			 }

			 @keyframes scaThree {
				 0% {transform: scale(1);}
			   60% {transform: scale(2.5) translate(55px, -115px);}
				 100% {transform: scale(1);}
			 }

			 @keyframes scaFour {
			   0% {transform: scale(1);}
			   60% {transform: scale(2.5) translate(55px, 115px);}
				 100% {transform: scale(1);}
			 }

			 @keyframes scaFive {
			   0% {transform: scale(1);}
			   60% {transform: scale(2.5) translateX(-110px);}
				 100% {transform: scale(1);}
			 }

			 @keyframes scaSix {
				 0% {transform: scale(1);}
			   60% {transform: scale(2.5) translateX(110px);}
				 100% {transform: scale(1);}
			 }

			 @keyframes scaSeven {
			   0% {transform: scale(1);}
			   60% {transform: scale(2.5);}
				 90% {transform: scale(1.5);}
				 100% {transform: scale(1);}
			 }
		 </style>
	</svg>
</div>

### Skew

The `skew` animation transforms an object along an oblique angle. It distorts each point by a certain angle in the horizontal and vertical directions. The greater the value is, the most distorted will be the object.

The expression can use one or two values. Each value represents the amount of skewing in one direction. It can be written `skew(ax)`, `skew(ax, ay)`, `skewX(a)`, or `skewY(a)`, where `a` is an `<angle>`.

 To specify the amount of skewing, the values indicates an `<angle>`. The angle value can expressed in degree like `90deg`, in turn from `0` to `1` like `0.25 turn`, or in radius like `1.64rad`.

         <div id="skewed" class="anim">
         	<?xml version="1.0" encoding="utf-8"?>
         	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
         		 <path class="ske-01" fill="#A51138" d="M100,280L10,150l90-130l90,130L100,280z"/>
         		 <path class="ske-02" fill="#CC2954" d="M300,280l-90-130l90-130l90,130L300,280z"/>
         		 <path class="ske-03" fill="#F27990" d="M500,280l-90-130l90-130l90,130L500,280z"/>
         		 <path class="ske-04" fill="#F2AABD" d="M700,280l-90-130l90-130l90,130L700,280z"/>
         		 <style>
         			 .anim {
         				 background-color:#E5E4E3;
         			 }
         			 .ske-01, .ske-02, .ske-03, .ske-04 {
         				 animation-duration: 2s;
         				 animation-iteration-count: infinite;
         				 animation-timing-function: ease-in-out;
         				 transform-origin: 50% 50%;
         			 }

         			 .ske-01 { animation-name: skeOne;}
         			 .ske-02 { animation-name: skeTwo;}
         			 .ske-03 { animation-name: skeThree;}
         			 .ske-04 { animation-name: skeFour;}

         			 @keyframes skeOne {
         				 0% {transform: skew(0);}
         				 100% {transform: skewX(35deg);}
         			 }

         			 @keyframes skeTwo {
         				 0% {transform: skew(0turn);}
         				 100% {transform: skew(-35deg);}
         			 }

         			 @keyframes skeThree{
         				 0% {transform: skew(0deg);}
         				 100% {transform: skew(35deg);}
         			 }

         			 @keyframes skeFour{
         				 0% {transform: skew(0);}
         				 100% {transform: skewX(-35deg);}
         			 }
         		 </style>
         	</svg>
         </div>


<div id="skewed" class="anim">
	<?xml version="1.0" encoding="utf-8"?>
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
		 <path class="ske-01" fill="#A51138" d="M100,280L10,150l90-130l90,130L100,280z"/>
		 <path class="ske-02" fill="#CC2954" d="M300,280l-90-130l90-130l90,130L300,280z"/>
		 <path class="ske-03" fill="#F27990" d="M500,280l-90-130l90-130l90,130L500,280z"/>
		 <path class="ske-04" fill="#F2AABD" d="M700,280l-90-130l90-130l90,130L700,280z"/>
		 <style>
			 .anim {
				 background-color:#E5E4E3;
			 }
			 .ske-01, .ske-02, .ske-03, .ske-04 {
				 animation-duration: 2s;
				 animation-iteration-count: infinite;
				 animation-timing-function: ease-in-out;
				 transform-origin: 50% 50%;
			 }

			 .ske-01 { animation-name: skeOne;}
			 .ske-02 { animation-name: skeTwo;}
			 .ske-03 { animation-name: skeThree;}
			 .ske-04 { animation-name: skeFour;}

			 @keyframes skeOne {
				 0% {transform: skew(0);}
				 100% {transform: skewX(35deg);}
			 }

			 @keyframes skeTwo {
				 0% {transform: skew(0turn);}
				 100% {transform: skew(-35deg);}
			 }

			 @keyframes skeThree{
				 0% {transform: skew(0deg);}
				 100% {transform: skew(35deg);}
			 }

			 @keyframes skeFour{
				 0% {transform: skew(0);}
				 100% {transform: skewX(-35deg);}
			 }
		 </style>
	</svg>
</div>


## Other CSS animations

Aside from transform properties, CSS animation also include color, fill, stroke, opacity, and direction animations. We will see in this part, for each of these animation, one example, a definition of the animation, and its possible values.

### Color

The `color` attribute speaks for itself as it defines the color fill of an element.

Possible values:

* keywords like `pink`
* color code like RGB `rgb(204, 41, 84)`, RGBA `rgba(204, 41, 84, 0.5)`, or Hex like `#CC2954`

        <div id="colored" class="anim">
        	<?xml version="1.0" encoding="utf-8"?>
        	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
        		<path class="pum-01" fill="#FFD5C0" d="M85,200l-35-50l35-50l35,50L85,200z"/>
        		<path class="dan-01" fill="#FFE6B3" d="M175,200l-35-50l35-50l35,50L175,200z"/>
        		<path class="tuli-01" fill="#F2AABD" d="M265,200l-35-50l35-50l35,50L265,200z"/>
        		<path class="lim-01" fill="#FFFFB3" d="M355,200l-35-50l35-50l35,50L355,200z"/>
        		<path class="gras-01" fill="#C3F2AA" d="M445,200l-35-50l35-50l35,50L445,200z"/>
        		<path class="tur-01" fill="#B7E5DD" d="M535,200l-35-50l35-50l35,50L535,200z"/>
        		<path class="sap-01" fill="#C1C7E0" d="M625,200l-35-50l35-50l35,50L625,200z"/>
        		<path class="grap-01" fill="#78288C" d="M715,200l-35-50l35-50l35,50L715,200z"/>

        		<style>
        			.anim {
        				background-color:#E5E4E3;
        			}
        			.tuli-01, .dan-01, .pum-01, .lim-01, .gras-01, .tur-01, .sap-01, .grap-01 {
        				animation-duration: 10s;
        				animation-iteration-count: infinite;
        				animation-timing-function: linear;
        			}

        			.tuli-01 { animation-name: colTul;}
        			.dan-01 { animation-name: colDan;}
        			.pum-01 { animation-name: colPum;}
        			.lim-01 { animation-name: colLim;}
        			.gras-01 { animation-name: colGras;}
        			.tur-01 { animation-name: colTur;}
        			.sap-01 { animation-name: colSap;}
        			.grap01 { animation-name: colGrap;}

        			@keyframes colPum {
        				0% {fill: #FFD5C0;}
        				10% {fill: #FFD4BF;}
        				20% {fill: #FF7733;}
        				30% {fill: #CC5215;}
        				40% {fill: #A43C07;}
        				50% {fill: #CC5215;}
        				60% {fill: #FF7733;}
        				70% {fill: #FFD4BF;}
        				80% {fill: #FFD5C0;}
        			}

        			@keyframes colDan {
        				0% {fill: #FFE6B3;}
        				10% {fill: #FFE5B2;}
        				20% {fill: #FFB727;}
        				30% {fill: #D7920A;}
        				40% {fill: #B17100;}
        				50% {fill: #D7920A;}
        				60% {fill: #FFB727;}
        				70% {fill: #FFE5B2;}
        				80% {fill: #FFE6B3;}
        			}

        			@keyframes colTul {
        				0% {fill: #F2AABD;}
        				10% {fill: #F27990;}
        				20% {fill: #CC2954;}
        				30% {fill: #A51138;}
        				40% {fill: #7C0826;}
        				50% {fill: #A51138;}
        				60% {fill: #CC2954;}
        				70% {fill: #F27990;}
        				80% {fill: #F2AABD;}
        			}

        			@keyframes colLim{
        				0% {fill: #FFFFB3;}
        				10% {fill: #FFFFB2;}
        				20% {fill: #F2F230;}
        				30% {fill: #F1F12F;}
        				40% {fill: #AEAE0B;}
        				50% {fill: #F1F12F;}
        				60% {fill: #F2F230;}
        				70% {fill: #FFFFB2;}
        				80% {fill: #FFFFB3;}
        			}

        			@keyframes colGras {
        				0% {fill: #C3F2AA;}
        				10% {fill: #C2F1A9;}
        				20% {fill: #76CC4A;}
        				30% {fill: #75CB49;}
        				40% {fill: #3E7E18;}
        				50% {fill: #75CB49;}
        				60% {fill: #76CC4A;}
        				70% {fill: #C2F1A9;}
        				80% {fill: #C3F2AA;}
        			}

        			@keyframes colTur {
        				0% {fill: #B7E5DD;}
        				10% {fill: #B6E4DC;}
        				20% {fill: #36B29A;}
        				30% {fill: #187E6D;}
        				40% {fill: #096555;}
        				50% {fill: #187E6D;}
        				60% {fill: #36B29A;}
        				70% {fill: #B6E4DC;}
        				80% {fill: #B7E5DD;}
        			}

        			@keyframes colSap {
        				0% {fill: #C1C7E0;}
        				10% {fill: #C0C6DF;}
        				20% {fill: #2B4099;}
        				30% {fill: #162771;}
        				40% {fill: #081758;}
        				50% {fill: #162771;}
        				60% {fill: #2B4099;}
        				70% {fill: #C0C6DF;}
        				80% {fill: #C1C7E0;}
        			}

        			@keyframes colGrap {
        				0% {fill: #DDB7E5;}
        				10% {fill: #DCB6E4;}
        				20% {fill: #78288C;}
        				30% {fill: #571365;}
        				40% {fill: #3E074B;}
        				50% {fill: #571365;}
        				60% {fill: #78288C;}
        				70% {fill: #DCB6E4;}
        				80% {fill: #DDB7E5;}
        			}
        		</style>
        	</svg>
        </div>


<div id="colored" class="anim">
	<?xml version="1.0" encoding="utf-8"?>
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
		<path class="pum-01" fill="#FFD5C0" d="M85,200l-35-50l35-50l35,50L85,200z"/>
		<path class="dan-01" fill="#FFE6B3" d="M175,200l-35-50l35-50l35,50L175,200z"/>
		<path class="tuli-01" fill="#F2AABD" d="M265,200l-35-50l35-50l35,50L265,200z"/>
		<path class="lim-01" fill="#FFFFB3" d="M355,200l-35-50l35-50l35,50L355,200z"/>
		<path class="gras-01" fill="#C3F2AA" d="M445,200l-35-50l35-50l35,50L445,200z"/>
		<path class="tur-01" fill="#B7E5DD" d="M535,200l-35-50l35-50l35,50L535,200z"/>
		<path class="sap-01" fill="#C1C7E0" d="M625,200l-35-50l35-50l35,50L625,200z"/>
		<path class="grap-01" fill="#78288C" d="M715,200l-35-50l35-50l35,50L715,200z"/>

		<style>
			.anim {
				background-color:#E5E4E3;
			}
			.tuli-01, .dan-01, .pum-01, .lim-01, .gras-01, .tur-01, .sap-01, .grap-01 {
				animation-duration: 10s;
				animation-iteration-count: infinite;
				animation-timing-function: linear;
			}

			.tuli-01 { animation-name: colTul;}
			.dan-01 { animation-name: colDan;}
			.pum-01 { animation-name: colPum;}
			.lim-01 { animation-name: colLim;}
			.gras-01 { animation-name: colGras;}
			.tur-01 { animation-name: colTur;}
			.sap-01 { animation-name: colSap;}
			.grap01 { animation-name: colGrap;}

			@keyframes colPum {
				0% {fill: #FFD5C0;}
				10% {fill: #FFD4BF;}
				20% {fill: #FF7733;}
				30% {fill: #CC5215;}
				40% {fill: #A43C07;}
				50% {fill: #CC5215;}
				60% {fill: #FF7733;}
				70% {fill: #FFD4BF;}
				80% {fill: #FFD5C0;}
			}

			@keyframes colDan {
				0% {fill: #FFE6B3;}
				10% {fill: #FFE5B2;}
				20% {fill: #FFB727;}
				30% {fill: #D7920A;}
				40% {fill: #B17100;}
				50% {fill: #D7920A;}
				60% {fill: #FFB727;}
				70% {fill: #FFE5B2;}
				80% {fill: #FFE6B3;}
			}

			@keyframes colTul {
				0% {fill: #F2AABD;}
				10% {fill: #F27990;}
				20% {fill: #CC2954;}
				30% {fill: #A51138;}
				40% {fill: #7C0826;}
				50% {fill: #A51138;}
				60% {fill: #CC2954;}
				70% {fill: #F27990;}
				80% {fill: #F2AABD;}
			}

			@keyframes colLim{
				0% {fill: #FFFFB3;}
				10% {fill: #FFFFB2;}
				20% {fill: #F2F230;}
				30% {fill: #F1F12F;}
				40% {fill: #AEAE0B;}
				50% {fill: #F1F12F;}
				60% {fill: #F2F230;}
				70% {fill: #FFFFB2;}
				80% {fill: #FFFFB3;}
			}

			@keyframes colGras {
				0% {fill: #C3F2AA;}
				10% {fill: #C2F1A9;}
				20% {fill: #76CC4A;}
				30% {fill: #75CB49;}
				40% {fill: #3E7E18;}
				50% {fill: #75CB49;}
				60% {fill: #76CC4A;}
				70% {fill: #C2F1A9;}
				80% {fill: #C3F2AA;}
			}

			@keyframes colTur {
				0% {fill: #B7E5DD;}
				10% {fill: #B6E4DC;}
				20% {fill: #36B29A;}
				30% {fill: #187E6D;}
				40% {fill: #096555;}
				50% {fill: #187E6D;}
				60% {fill: #36B29A;}
				70% {fill: #B6E4DC;}
				80% {fill: #B7E5DD;}
			}

			@keyframes colSap {
				0% {fill: #C1C7E0;}
				10% {fill: #C0C6DF;}
				20% {fill: #2B4099;}
				30% {fill: #162771;}
				40% {fill: #081758;}
				50% {fill: #162771;}
				60% {fill: #2B4099;}
				70% {fill: #C0C6DF;}
				80% {fill: #C1C7E0;}
			}

			@keyframes colGrap {
				0% {fill: #DDB7E5;}
				10% {fill: #DCB6E4;}
				20% {fill: #78288C;}
				30% {fill: #571365;}
				40% {fill: #3E074B;}
				50% {fill: #571365;}
				60% {fill: #78288C;}
				70% {fill: #DCB6E4;}
				80% {fill: #DDB7E5;}
			}
		</style>
	</svg>
</div>

### Fill

The `fill-mode` property remembers the first state at the beginning of the animation and the last state at the end of the animation. It is useful in case you would like your animation to start or end with a specific state.

The `fill-mode` animation can have four different values: `none`, `forwards`, `backwards`, and `both`. With `forwards`, the target will be like the last keyframe played. `forwards` can be influenced by `animation-direction` and `animation-iteration-count`. `Backwards` applies the value of the first keyframe at the end of the animation. It is influenced by `animation-delay` and `animation-direction`.

The initial value is `none`.

        <div id="fillMode" class="anim">
        	<?xml version="1.0" encoding="utf-8"?>
        	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
        		<path class="colForwards" fill="#CC2954" d="M500,280l-90-130l90-130l90,130L500,280z"/>
        		<path class="colBackwards" fill="#CC2954" d="M300,280l-90-130l90-130l90,130L300,280z"/>
        		<style>
        			.anim {
        				background-color:#E5E4E3;
        			}
        			.colBackwards, .colForwards {
        				animation-duration: 4s;
        				animation-iteration-count: 1;
        				animation-delay: 2s;
        			}

        			.colBackwards {
        				animation-name: modeForw;
        				animation-fill-mode: backwards;
        			}
        			.colForwards {
        				animation-name: modeBack;
        				animation-fill-mode: forwards;
        			}

        			@keyframes modeForw {
        				0% { fill: #CC2954;}
        				50% { fill: #FFB727;}
        				100% { fill: #FF7733;}
        			}

        			@keyframes modeBack{
        				0% { fill: #CC2954;}
        				50% { fill: #FFB727;}
        				100% { fill: #FF7733;}
        			}
        		</style>
        	</svg>
        </div>

<div id="fillMode" class="anim">
	<?xml version="1.0" encoding="utf-8"?>
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
		<path class="colForwards" fill="#CC2954" d="M500,280l-90-130l90-130l90,130L500,280z"/>
		<path class="colBackwards" fill="#CC2954" d="M300,280l-90-130l90-130l90,130L300,280z"/>
		<style>
			.anim {
				background-color:#E5E4E3;
			}
			.colBackwards, .colForwards {
				animation-duration: 4s;
				animation-iteration-count: 1;
				animation-delay: 2s;
			}

			.colBackwards {
				animation-name: modeForw;
				animation-fill-mode: backwards;
			}
			.colForwards {
				animation-name: modeBack;
				animation-fill-mode: forwards;
			}

			@keyframes modeForw {
				0% { fill: #CC2954;}
				50% { fill: #FFB727;}
				100% { fill: #FF7733;}
			}

			@keyframes modeBack{
				0% { fill: #CC2954;}
				50% { fill: #FFB727;}
				100% { fill: #FF7733;}
			}
		</style>
	</svg>
</div>

### Stroke

The `stroke` defines the color attributes of an element outline.

Possible values:

* keywords like `pink`
* color code like RGB `rgb(204, 41, 84)`, RGBA `rgba(204, 41, 84, 0.5)`, or Hex like `#CC2954`

The default value for color of the `stroke` attribute is `none`.

The `stroke-dasharray` attribute specifies on a dashed strokes the length of the dashes and of the gaps. The values of a dash and a gap are separated with a white space or a comma. The length values can be a

The `stroke-dashoffset` attribute indicates the length before the first dash of the series starts.

        <div id="stroked" class="anim">
        	<?xml version="1.0" encoding="utf-8"?>
        	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
        		<path class="path-01" fill="#E5E4E3" d="M400,280l-90-130l90-130l90,130L400,280z"/>
         		<path class="path-02" fill="#E5E4E3" d="M400,250l-70-100l70-100l70,100L400,250z"/>
         		<path class="path-03" fill="#E5E4E3"d="M400,220l-50-70l50-70l50,70L400,220z"/>
         		<path class="path-04" fill="#E5E4E3" d="M400,190l-30-40l30-40l30,40L400,190z"/>
        		<style>
        			.anim {
        				background-color:#E5E4E3;
        			}
        			.path-01, .path-02, .path-03, .path-04 {
        				animation-iteration-count: infinite;
        				animation-duration: 6s;
        				stroke-width: 6px;
        				stroke-linejoin: round;
        				stroke-linecap: round;
        				stroke-dasharray: 1000;
        				stroke-dashoffset: 1000;
        			}
        			.path-01 {
        				stroke: #F2F230;
        				animation-name: pathOne;
        			}
        			.path-02 {
        				stroke: #FFB727;
        				animation-name: pathTwo;
        			}
        			.path-03 {
        				stroke: #FF7733;
        				animation-name: pathThree;
        			}
        			.path-04 {
        				stroke: #CC2954;
        				animation-name: pathFour;
        			}

        			@keyframes pathOne {
        			  from { stroke-dashoffset: 1000;}
        			  to {stroke-dashoffset: 0;}
        			}

        			@keyframes pathTwo {
        				from { stroke-dashoffset: 1000;}
        				to {stroke-dashoffset: 0;}
        			}

        			@keyframes pathThree {
        				from { stroke-dashoffset: 1000;}
        				to {stroke-dashoffset: 0;}
        			}

        			@keyframes pathFour {
        				from { stroke-dashoffset: 1000;}
        				to {stroke-dashoffset: 0;}
        			}
        		</style>
        	</svg>
        </div>

<div id="stroked" class="anim">
	<?xml version="1.0" encoding="utf-8"?>
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
		<path class="path-01" fill="#E5E4E3" d="M400,280l-90-130l90-130l90,130L400,280z"/>
 		<path class="path-02" fill="#E5E4E3" d="M400,250l-70-100l70-100l70,100L400,250z"/>
 		<path class="path-03" fill="#E5E4E3"d="M400,220l-50-70l50-70l50,70L400,220z"/>
 		<path class="path-04" fill="#E5E4E3" d="M400,190l-30-40l30-40l30,40L400,190z"/>
		<style>
			.anim {
				background-color:#E5E4E3;
			}
			.path-01, .path-02, .path-03, .path-04 {
				animation-iteration-count: infinite;
				animation-duration: 6s;
				stroke-width: 6px;
				stroke-linejoin: round;
				stroke-linecap: round;
				stroke-dasharray: 1000;
				stroke-dashoffset: 1000;
			}
			.path-01 {
				stroke: #F2F230;
				animation-name: pathOne;
			}
			.path-02 {
				stroke: #FFB727;
				animation-name: pathTwo;
			}
			.path-03 {
				stroke: #FF7733;
				animation-name: pathThree;
			}
			.path-04 {
				stroke: #CC2954;
				animation-name: pathFour;
			}

			@keyframes pathOne {
			  from { stroke-dashoffset: 1000;}
			  to {stroke-dashoffset: 0;}
			}

			@keyframes pathTwo {
				from { stroke-dashoffset: 1000;}
				to {stroke-dashoffset: 0;}
			}

			@keyframes pathThree {
				from { stroke-dashoffset: 1000;}
				to {stroke-dashoffset: 0;}
			}

			@keyframes pathFour {
				from { stroke-dashoffset: 1000;}
				to {stroke-dashoffset: 0;}
			}
		</style>
	</svg>
</div>

### Opacity

The `opacity` attribute defines the transparency of an element.

The possible values for the amount of transparency are written by a whole number (integer) or decimal number from `0` to `1`, or with a percentage like `50%`.`

        <div id="opacified" class="anim">
        	<?xml version="1.0" encoding="utf-8"?>
        	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
        		 <g class="star">
        			 <path class="opa-01" fill="#FF7733" d="M400,190l-60-85l60-85l60,85L400,190z"/>
        			 <path class="opa-02" fill="#FFB727" d="M371.7,178.3l17.7-102.5l102.5-17.7l-17.7,102.5L371.7,178.3z"/>
        			 <path class="opa-03" fill="#F2F230" d="M360,150l85-60l85,60l-85,60L360,150z"/>
        			 <path class="opa-04" fill="#76CC4A" d="M371.7,121.7l102.5,17.7l17.7,102.5l-102.5-17.7L371.7,121.7z"/>
        			 <path class="opa-05" fill="#36B29A" d="M400,280l-60-85l60-85l60,85L400,280z"/>
        			 <path class="opa-06" fill="#2B4099" d="M308.1,241.9l17.7-102.5l102.5-17.7l-17.7,102.5L308.1,241.9z"/>
        			 <path class="opa-07" fill="#78288C" d="M270,150l85-60l85,60l-85,60L270,150z"/>
        			 <path class="opa-08" fill="#CC2954" d="M308.1,58.1l102.5,17.7l17.7,102.5l-102.5-17.7L308.1,58.1z"/>
        	 	</g>
        		<style>
        			.anim {
        				background-color:#E5E4E3;
        			}
        			.star {
        				animation-name: star;
        				animation-duration: 20s;
        				animation-iteration-count: infinite;
        				animation-timing-function: linear;
        				transform-origin: 50% 50%;
        			}

        			@keyframes star {
        				0% { transform: rotate(0deg);}
        				100% { transform: rotate(360deg);}
        			}

        			.opa-01, .opa-02, .opa-03, .opa-04, .opa-05, .opa-06, .opa-07, .opa-08 {
        				animation-duration: 5s;
        				animation-iteration-count: infinite;
        				animation-timing-function: linear;
        			}
        			.opa-01 { animation-name: opaOne;}
        			.opa-02 { animation-name: opaTwo;}
        			.opa-03 { animation-name: opaThree;}
        			.opa-04 { animation-name: opaFour;}
        			.opa-05 { animation-name: opaFive;}
        			.opa-06 { animation-name: opaSix;}
        			.opa-07 { animation-name: opaSeven;}
        			.opa-08 { animation-name: opaEight;}

        			@keyframes opaOne {
        				0% { opacity: 0.1; }
        				50% { opacity: 0.5; }
        				100% {opacity: 0.1; }
        			}

        			@keyframes opaTwo {
        				0% { opacity: 0.1; }
        				50% { opacity: 0.5; }
        				100% {opacity: 0.1; }
        			}

        			@keyframes opaThree {
        				0% { opacity: 0.1; }
        				50% { opacity: 0.5; }
        				100% {opacity: 0.1; }
        			}

        			@keyframes opaFour {
        				0% { opacity: 0.1; }
        				50% { opacity: 0.5; }
        				100% {opacity: 0.1; }
        			}

        			@keyframes opaFive {
        				0% { opacity: 0.1; }
        				50% { opacity: 0.5; }
        				100% {opacity: 0.1; }
        			}

        			@keyframes opaSix {
        				0% { opacity: 0.1; }
        				50% { opacity: 0.5; }
        				100% {opacity: 0.1; }
        			}

        			@keyframes opaSeven {
        				0% { opacity: 0.1; }
        				50% { opacity: 0.5; }
        				100% {opacity: 0.1; }
        			}

        			@keyframes opaEight {
        				0% { opacity: 0.1; }
        				50% { opacity: 0.5; }
        				100% {opacity: 0.1; }
        			}
        		</style>
        	</svg>
        </div>


<div id="opacified" class="anim">
	<?xml version="1.0" encoding="utf-8"?>
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
		 <g class="star">
			 <path class="opa-01" fill="#FF7733" d="M400,190l-60-85l60-85l60,85L400,190z"/>
			 <path class="opa-02" fill="#FFB727" d="M371.7,178.3l17.7-102.5l102.5-17.7l-17.7,102.5L371.7,178.3z"/>
			 <path class="opa-03" fill="#F2F230" d="M360,150l85-60l85,60l-85,60L360,150z"/>
			 <path class="opa-04" fill="#76CC4A" d="M371.7,121.7l102.5,17.7l17.7,102.5l-102.5-17.7L371.7,121.7z"/>
			 <path class="opa-05" fill="#36B29A" d="M400,280l-60-85l60-85l60,85L400,280z"/>
			 <path class="opa-06" fill="#2B4099" d="M308.1,241.9l17.7-102.5l102.5-17.7l-17.7,102.5L308.1,241.9z"/>
			 <path class="opa-07" fill="#78288C" d="M270,150l85-60l85,60l-85,60L270,150z"/>
			 <path class="opa-08" fill="#CC2954" d="M308.1,58.1l102.5,17.7l17.7,102.5l-102.5-17.7L308.1,58.1z"/>
	 	</g>
		<style>
			.anim {
				background-color:#E5E4E3;
			}
			.star {
				animation-name: star;
				animation-duration: 20s;
				animation-iteration-count: infinite;
				animation-timing-function: linear;
				transform-origin: 50% 50%;
			}

			@keyframes star {
				0% { transform: rotate(0deg);}
				100% { transform: rotate(360deg);}
			}

			.opa-01, .opa-02, .opa-03, .opa-04, .opa-05, .opa-06, .opa-07, .opa-08 {
				animation-duration: 5s;
				animation-iteration-count: infinite;
				animation-timing-function: linear;
			}
			.opa-01 { animation-name: opaOne;}
			.opa-02 { animation-name: opaTwo;}
			.opa-03 { animation-name: opaThree;}
			.opa-04 { animation-name: opaFour;}
			.opa-05 { animation-name: opaFive;}
			.opa-06 { animation-name: opaSix;}
			.opa-07 { animation-name: opaSeven;}
			.opa-08 { animation-name: opaEight;}

			@keyframes opaOne {
				0% { opacity: 0.1; }
				50% { opacity: 0.5; }
				100% {opacity: 0.1; }
			}

			@keyframes opaTwo {
				0% { opacity: 0.1; }
				50% { opacity: 0.5; }
				100% {opacity: 0.1; }
			}

			@keyframes opaThree {
				0% { opacity: 0.1; }
				50% { opacity: 0.5; }
				100% {opacity: 0.1; }
			}

			@keyframes opaFour {
				0% { opacity: 0.1; }
				50% { opacity: 0.5; }
				100% {opacity: 0.1; }
			}

			@keyframes opaFive {
				0% { opacity: 0.1; }
				50% { opacity: 0.5; }
				100% {opacity: 0.1; }
			}

			@keyframes opaSix {
				0% { opacity: 0.1; }
				50% { opacity: 0.5; }
				100% {opacity: 0.1; }
			}

			@keyframes opaSeven {
				0% { opacity: 0.1; }
				50% { opacity: 0.5; }
				100% {opacity: 0.1; }
			}

			@keyframes opaEight {
				0% { opacity: 0.1; }
				50% { opacity: 0.5; }
				100% {opacity: 0.1; }
			}
		</style>
	</svg>
</div>

### Direction

The `animation-direction` property specifies whether an animation should play forwards, backwards, or alternating back and forth.

The `animation-direction` has has four different values: `normal`, `reverse`, `alternate`, and `alternate-reverse`.

The initial value is `normal`.

        <div id="direction" class="anim">
        	<?xml version="1.0" encoding="utf-8"?>
        	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
        		 <path class="rev-01" fill="#2B4099" d="M200,220l-50-70l50-70l50,70L200,220z"/>
        		 <path class="rev-02" fill="#78288C" d="M300,220l-50-70l50-70l50,70L300,220z"/>
        		 <path class="rev-03" fill="#CC2954" d="M400,220l-50-70l50-70l50,70L400,220z"/>
        		 <path class="rev-04" fill="#FF7733" d="M500,220l-50-70l50-70l50,70L500,220z"/>
        		 <path class="rev-05" fill="#FFB727" d="M600,220l-50-70l50-70l50,70L600,220z"/>

        		<style>
        			.anim {
        				background-color:#E5E4E3;
        			}
        			.rev-01, .rev-02, .rev-04, .rev-05 {
        				animation-iteration-count: infinite;
        				animation-duration: 2s;
        				animation-direction: alternate-reverse;
        			}
        			.rev-01 {animation-name: revOne;}
        			.rev-02 {animation-name: revTwo;}
        			.rev-04 {animation-name: revFour;}
        			.rev-05 {animation-name: revFive;}

        			@keyframes revOne {
        			  from { transform: translate(0);}
        			  to { transform: translate(-80px);}
        			}

        			@keyframes revTwo {
        				from { transform: translate(0);}
        			  to { transform: translate(-40px);}
        			}

        			@keyframes revFour {
        				from { transform: translate(0);}
        			  to { transform: translate(40px);}
        			}

        			@keyframes revFive {
        				from { transform: translate(0);}
        			  to { transform: translate(80px);}
        			}
        		</style>
        	</svg>
        </div>

<div id="direction" class="anim">
	<?xml version="1.0" encoding="utf-8"?>
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 viewBox="0 0 800 300" style="enable-background:new 0 0 800 300;" xml:space="preserve">
		 <path class="rev-01" fill="#2B4099" d="M200,220l-50-70l50-70l50,70L200,220z"/>
		 <path class="rev-02" fill="#78288C" d="M300,220l-50-70l50-70l50,70L300,220z"/>
		 <path class="rev-03" fill="#CC2954" d="M400,220l-50-70l50-70l50,70L400,220z"/>
		 <path class="rev-04" fill="#FF7733" d="M500,220l-50-70l50-70l50,70L500,220z"/>
		 <path class="rev-05" fill="#FFB727" d="M600,220l-50-70l50-70l50,70L600,220z"/>

		<style>
			.anim {
				background-color:#E5E4E3;
			}
			.rev-01, .rev-02, .rev-04, .rev-05 {
				animation-iteration-count: infinite;
				animation-duration: 2s;
				animation-direction: alternate-reverse;
			}
			.rev-01 {animation-name: revOne;}
			.rev-02 {animation-name: revTwo;}
			.rev-04 {animation-name: revFour;}
			.rev-05 {animation-name: revFive;}

			@keyframes revOne {
			  from { transform: translate(0);}
			  to { transform: translate(-80px);}
			}

			@keyframes revTwo {
        from { transform: translate(0);}
        to { transform: translate(-40px);}
			}

			@keyframes revFour {
        from { transform: translate(0);}
        to { transform: translate(40px);}
			}

			@keyframes revFive {
        from { transform: translate(0);}
        to { transform: translate(80px);}
			}
		</style>
	</svg>
</div>

## CSS animations common use

### Hover states

Hover states indicate to web page visitor using a pointing device that an element is interactive. It would be nice to not forget mobile devices users and to also indicate that an element is tappable on mobile view. I personally like hover state that are clear enough to indicate what elements are interactive but that are not too overwhelming. I am not a big fan of the giant and bold explosions that appear on some websites because they can be distracting.

Find below an example of how we animated hover states with CSS transitions on [to icon](https://www.toicon.com/) (where we share high quality icons series for free).  

        .yourTargetElement {
          example
        }

![Placeholder](05-11-animtut/placeholder.svg)

### Logo animations

There are some very nice stroke animated logos on the web. I personally really like the hand drawn ones because they feel unique and personal. I am not so convinced by horizontal rotating logos because they seem a bit retro. But well, after all, isn't the 90's style back?

        .yourTargetElement {
          example
        }

![Placeholder](05-11-animtut/placeholder.svg)

### Illustrated animations

I think that animations that work best are animated line drawings, looping figurative sceneries with an atmosphere, or looping geometrical animations. Sometimes, I stare at these for a few minutes because they can be mesmerizing.

        .yourTargetElement {
          example
        }

![Placeholder](05-11-animtut/placeholder.svg)


## Conclusion

We hope this tutorial helped you to get a basic understanding of CSS animations and what they are capable of, that you can now create simple CSS animations and adjust them to your preference by tweaking keyframes. CSS gives an easy way to control some time features like keyframes, duration, iteration, easing, and delay. They easily allows to transform an SVG element with rotations, translations, scaling, and skewing. Changing color and opacity styles, and animating a stroke are also made easy with quite straightforward expressions. CSS animations are not made for photo-realistic organic effects, or for designing a complex sequence of interactions but you can already play around with what has been implemented.

We wish you a very good luck to create your own beautiful and useful CSS animation on SVGs. Don't hesitate to send us your feedback on this tutorial, or to share your CSS animation creations!
