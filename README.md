# The Artificial site

     _____ _               _         _   _  __ _      _       _
    |_   _| |__   ___     / \   _ __| |_(_)/ _(_) ___(_) __ _| |
      | | | '_ \ / _ \   / _ \ | '__| __| | |_| |/ __| |/ _` | |
      | | | | | |  __/  / ___ \| |  | |_| |  _| | (__| | (_| | |
      |_| |_| |_|\___| /_/   \_\_|   \__|_|_| |_|\___|_|\__,_|_|

As seen at http://theartificial.nl/

## Setup

### Getting the source

The source code for the site is managed with git, with a shared repository hosted on GitHub: https://github.com/gerwitz/theartificial.nl

Using the GitHub app, get a local working repository to work with. I suggest keeping local repositories in a folder (in your user "home" folder) named "Working".

### Synchronizing changes

As you edit, "commit" frequently with a short note about the changes you've made. The GitHub app makes it easy to sync (also known as "pushing" and "pulling") with our shared repository as you do this.

It will notify you and we can work through conflicts if the same file is edited by multiple people. But please reduce the chances and the scope of conflicts by synchronizing often.

## Testing

### Using the shell

Open a shell (a window of the Terminal app). It will start in the context of your user folder, with a prompt like this:

    macbook:~ username$

Change the current directory to your working repository with the "cd" commend, like so:

    $ cd Working/theartificial.nl

_Do not type the `$` in front, I use it only to denote this is a shell command._

Your prompt (and the window title) will change to reflect the new context, to something like this:

    macbook:theartificial.nl username$

The first time, you will need to use this command to set up your machine:

    $ bundle install

_(Remember, don't type that `$`)_

_(If this command doesn't work, you may need to [install Bundler](http://bundler.io/#getting-started) or just ask for help.)_

When major code changes are made, you may have to `bundle install` again.

### Launching Middleman

The site is built using the [Middleman](http://middlemanapp.com/) framework. In short, it uses the files in the `source` folder to build the files that will be hosted on the server.

Usually, you will want to let it magically do this on the fly. Use this command:

    $ bundle exec middleman server

It should tell you this:

    == The Middleman is standing watch at http://0.0.0.0:4567

You may then visit that URL and see a live (local) build. But because we're using TypeKit for web fonts, you'll need to instead use `localhost` instead of `0.0.0.0`. So point your browser to: [localhost:4567](http://localhost:4567/)

Changes you make to the `source` folder should be reflected as soon as you refresh any page on that local site.

You may stop Middleman by closing that Terminal window or pressing control-C.

## Making Changes

### Pull from git

Don't forget to regularly visit the GitHub app and pull (synchronize) to make sure you're working with the latest files!

### Files

The structure of the site should be pretty clear. There are a few filetypes to know:

- `.scss`: a Sass sheet that will be compiled into .css
- `.erb`: a file (usually HTML) that includes some <% Ruby code %>
- `.md`: a Markdown document that will be transformed into HTML

### Frontmatter

Many files will start with a pair of `---` lines with some text between them. This is an increasingly common approach to adding metadata to a file. This text is formatted in YAML, but it should be pretty obvious how things work.

### Blog posts

Create a file in `source/blog` with a `YYYY-MM-DD-slug.md` filename. The reuslting URL will be `/YYYY/MM/DD/slug.html`. This file needs frontmatter with four fields:

    ---
    title: "A title"
    category: testing
    tags: one, two, three
    author: hans
    masthead: MM-DD-slug/someimage.jpg
    ---

N.B. titles don't have to have quotes but it's more reliable to include them, and author must match one of the files avaiable under `source/people`

The author field will look for a corresponding `people` page and display proper names and links. If you use a string such as "Hans Gerwitz" it will display that name without a link. This should be used sparingly for guest posts.

Optionally, create a folder named `YYYY-MM-DD-slug` for images, and specify a relative path to one as the masthead image, as above.

You may, of course, include other images there, preferably 800px wide. They can be referenced within a post with the '!' Markdown syntax:

    ![alt text](YYYY-MM-DD/filename.jpg)

_(PNG files will also work, but read below.)_

### Optimizing images

PNGs are nice because they are "lossless" and don't get blurring compression artifacts like JPEG. But this also makes them less efficient. With large visuals it's very easy to end up wasting many MB of space and network traffic. Please use JPEG (not PNG) for photos and optimize all images with [ImageOptim](https://imageoptim.com).

### Commit

Use the GitHub app to commit your changes with a meaningful comment and be sure to push (synchronize). You can always double-check that your commit was pushed by visiting the [history page](https://github.com/gerwitz/theartificial.nl/commits/master).
