---
title: "Dear Adobe Illustrator"
category: meta
tags: icons, design, adobe, illustrator, ranting
author: jo
---

Dear Adobe Illustrator,
I am writing this open letter as a close friend. Over the last decade we have spent so much time together that I think I know you better than I know myself. I understand your strengths, your quirks, and perhaps brutally, I know your limitations. I feel your pain: especially while I'm trying to do a sexy blended drop shadow, gaussian blur in-one with a crazy clipping mask and a 20% opaque stroke. I just lost the attention of non-designers. In any event, that's not what we need to talk about today. I'm sorry that I have to say this, but I'm fairly sure if I don't, no one else will. 

Here at The Artificial, you have been helping us to make pixel-precise, scalable icons for [to [icon]](http://toicon.com/). Sure we've had good times, but this isn't one of them. For those pixel perfect icons, you kinda suck. The worst part is that most of the suck seems to be glitches that fuel paranoia, and worse, waste my time.

#The 6 pointed triangle

Why do you make me work this hard? 
You can draw a 3 sided triangle in Polygon shape mode, why are you pretending you can't do to it in Star mode? Removing those extra points off a few hundred icons could have been time better spent re-watching [True facts about the Octopus](https://www.youtube.com/watch?v=st8-EY71K84) and squirming.

![the 6 pointed triangle](2014-05-22-dearillustrator/image_triangle.png)

#Point-crazed pathfinder 

Honestly I don't even know what 0,028 pt stands for, or why it's appropriate as the default value for pathfinder operations in a vector program. For the pain pathfinder has caused me as a result of this 0,028 pt, it warrants a mention.

Have you ever added two shapes in Pathfinder after putting in the effort of snapping objects to a grid, a pixel, or even aligning those suckers to each other, only to have your straight line become littered by points? Oh I have. The secret is hidden in pathfinder defaults. If you go to options in the Pathfinder palette, you will most likely find precision is set to 0,028pt, and Remove Redundant points is unchecked. It's obvious what you have to do after you see that! Never again Illustrator...

![pathfinder](2014-05-22-dearillustrator/image_pathfinder.png)

#Ghost Pixel

It's there, it's not there, it's having an existential crisis. I see it, I zoom in, it's staring me in the face. I pan it off the screen, it's gone, I zoom out it's back. We loop through this a few times. I give up. You're toying with me. Cruel move, Illustrator.

![ghostpixel](2014-05-22-dearillustrator/image_ghost-pixel.gif)

#Pixel Poop

That's when that sadistic ghost pixel actually chases you around your screen, also known as reverse Pac-Man in the office. Okay, fine, might just be me. Great way to make a designer paranoid.

![pixel poop](2014-05-22-dearillustrator/image_pixelpoop.gif)


#Strange Stroking

Somehow the symmetry of anchor points is not symmetrical if you outline a stroke that's curve and on a diagonal.  Luckily in icons that never happens. Right? I know you are trying to be smart here, Illustrator, but I don't know why one side of a symmetrical shape gets double the points. Why do you insist on doing this to me? 

![stroking](2014-05-22-dearillustrator/image_stroke.png)

I have a lot more to say, but this is enough for one session. Now here are some constructive tips for wrangling those anchor points.

#Pro tips and work arounds

What doesn't kill you makes you stronger, or at least a bit wiser. I have been doing QA of icons lately, and I have found that there are a few ways of wrangling your crazed anchor points. Step one of course is knowing how many there are. 

I have three words for you: Document Info palette

It's a bit hidden, but here's what to do: open Document Info palette. Go to the palette's menu and select Object. Voila, you will suddenly see the following for any object/objects you have selected: number of paths, if they are open or closed, anchor points, and length of the path (for when you are creating a string sculpture and need to know that sort of thing).

How do minimise those pesky anchor points (especially on curves)?

A) Simplify tool. If there are a lot of points and accuracy isn't a huge deal, use Object > Path > Simplify, and tinker with the settings for the right level of fidelity.

B) Smooth tool. Under the Pencil control, this lets you redraw the shape with fewer points. Again, it's not pixel precise.

C) A plug-in called [Pathscribe](http://www.astutegraphics.com/software/vectorscribe/). It's a shame this isn't in illustrator by default, but it's the best option when it comes to recreating curves with minimal anchor points. It doesn't replace a good designer, but can clean up after a pathfinder massacre in a few clicks, assuming you figure out the UI.

D) Redraw it. It'll be probably better now anyway.