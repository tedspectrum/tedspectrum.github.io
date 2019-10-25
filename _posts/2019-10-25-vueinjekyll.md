---
layout: post
title:  "Web apps in Jekyll"
---

# Setup for styles at top, scripts at bottom

To setup Jekyll so that posts can have scripts beneath the header
and styles added in the footer, amend the __head.html__ and __footer.html__ files
in the **_includes** directory.  Add front matter to the jekyll post to provide
data that informs what scripts and styles to add.

Finally wrap content in __raw__, __endraw__ liquid tags to allow double brackets
etc. in the content.

## Data in the post front matter

Add data for the styles and scripts in the post front matter

{% highlight yaml %}
{% raw %}
layout: post
title:  "Some title"
styles:
  - url: "/relative_path_to_css/some.css"
    type: "relative"
scripts: 
  - url: "https://mycdn/somecode.js"
    type: "absolute"
  - url: "/relative_path_to_script/some.js"
    type: "relative"
{% endraw %}
{% endhighlight %}

## Styles in the header

Add the code below in the __head.html__ file before the end head tag

{% highlight liquid %}
{% raw %}
  {% for item in page.styles %}
  {% case item.type %}
  {% when "absolute" %}
  <link rel="stylesheet" href="{{ item.url }}">
  {% when "relative" %}
  <link rel="stylesheet" href="{{ item.url | relative_url }}">
  {% endcase %}
  {% endfor %}
{% endraw %}
{% endhighlight %}

## Scripts after the footer

Add the code below at the end of the __footer.html__

{% highlight liquid %}
{% raw %}
  {% for item in page.scripts %}
  {% case item.type %}
  {% when "absolute" %}
  <script src="{{ item.url }}"></script>
  {% when "relative" %}
  <script src="{{ item.url | relative_url }}"></script>
  {% endcase %}
  {% endfor %}
{% endraw %}
{% endhighlight %}