# The Artificial site

See [hackpad](https://theart.hackpad.com/Updating-TheArtificial.nl-Uf3jasnlFzW) for details.

### Pull from git
Don't forget to regularly visit the GitHub app and pull (synchronize) to make sure you're working with the latest files!

### Files
The structure of the site should be pretty clear. There are a few filetypes to know:
- `.scss`: a Sass sheet that will be compiled into .css
- `.erb`: a file (usually HTML) that includes some <% Ruby code %>
- `.md`: a Markdown document that will be transformed into HTML

### Frontmatter
Many files will start with a pair of '---' lines with some text between them. This is an increasingly common approach to adding metadata to a file. The test is formatted in YAML, but it should be pretty obvious how things work.

### Blog posts

Create a file in `source/blog` with a `YYYY-MM-DD-slug.md` filename. The reuslting URL will be `/YYYY/MM/DD/slug.html`. This file needs frontmatter with four fields:
    ---
    title: "A title"
    category: testing
    tags: one, two, three
    author: hans
    ---
N.B. titles don't have to have quotes but it's more reliable to include them, and author must match one of the files avaiable under `source/people`

Also creat a folder named `YYYY-MM-DD-slug` for images,and include two standard images:

- `-preview.png` 600x400px image used in lists
- `-masthead.png` 1200x320px header image rendered int he post itself

You may, of course, include other images there, preferably 800px wide. They can be referenced within a post with the '!' Markdown syntax:
    ![alt text](YYYY-MM-DD/filename.jpg)
(Inline images needn't be PNG.)

### Optimizing images
PNGs are nice because they are "lossless" and don't get blurring compression artifacts like JPEG. But this also makes them less efficient.

With photos it's very easy to end up wasting many MB of space and network traffic. Please do your best to optimize PNGs with a "lossy" PNG optimizer, such as [ImageAlpha](http://pngmini.com/) and all images with a more-efficient-than-Adobe compressor such as [ImageOptim](https://imageoptim.com).
