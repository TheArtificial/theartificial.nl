  var
    width = window.innerWidth*0.9,
    height = window.innerHeight*0.9;

  // SVG selection that holds the visualization
  var svg = d3.select(".visualization").append("svg")
    .attr("id", "container")
    .attr("viewBox", "0 0 " + width + " " + height) //viewbox
    .append("g")
    .attr("preserveAspectRatio", "xMidYMid meet");

  // force layout, used to calculate positions
  var force = d3.layout.force()
    .linkDistance(50)
    .linkStrength(0.25)
    .charge(-125)
    .size([width, height])
    .on("tick", tick);

  // this global will hold the loaded data
  var graph;

  // and these will hold the SVG elements
  var nodeSelection = svg.selectAll('.node');
      linkSelection = svg.selectAll('.link');

  // lookup arrays for styling
  var color = ["white", "fff2bc","00a1a3", "97d9eb","#e66964","#f3aa84", "#f6c831"];
  var colorindustry = ["#28b67a", "#7bc580", "#bfd857", "#53b59f", "#bedea8", "white"];
  var colorcontinent = ["white", "#bf8ec0", "#fbc4aa", "#de4f76", "#f494be", "#edb9d0", "white"];
  var colorstatus = ["#00b3c5", "#91d3ce", "#007bc1", "#00b7a3", "#a0cae7", "white"];
  var coloryear = ["white","white","white", "#e66964", "#f3aa84", "#f6c831"];
  var radius = ["100","100","100","5","5","5"]; // the first three shouldn't happen

  // filter values
  // special case: [] matches nodes with multiple values
  var includeGroupyears = [3,4,5];
  var includeGroupstatus = [0,1,2,3,4];
  var includeGroupcontinents = [1,2,3,4,5];
  var includeGroupindustries = [0,1,2,3,4];

  // load and tick the layout, then draw all the things
  function draw() {

    // get them from the loaded graph
    var allNodes = graph.nodes.slice(); // slice forces a copy
        rawLinks = graph.links.slice();
    // we have to find nodes ourself, because d3.force.links expects objects or indexes.
    var allLinks = rawLinks.map(function(link) {
      var source = allNodes.find(function(node) { return node.id === link.source; });
      var target = allNodes.find(function(node) { return node.id === link.target; });
      return {source: source, target: target, stroke: link.stroke}; });
    // console.log("allLinks", allLinks);
    // console.log("rawLinks", rawLinks);
    // console.log("linkSelection", linkSelection);

    var filteredNodes = allNodes.filter(filterNode),
        nodeIds = filteredNodes.map(function(node){ return node.id }),
        filteredLinks = trimLinks(allLinks, nodeIds)
        // console.log("Filtered links", allLinks, filteredLinks, graph);

    // start the layout ticking
    force
      .nodes(filteredNodes)
      .links(filteredLinks)
      .start();

    // bind the data array to the svg selection
    linkSelection = linkSelection.data(filteredLinks);

    linkSelection.enter().append("path");

    var linkupdate = d3.selectAll("path")

    function update() {
      // Update selection: Resize and position existing
      // DOM elements with data bound to them.
        linkupdate.attr("class", "link") // you have to do this or you can't re-select it!
            .style("opacity", "0.2")
            .style("stroke-width", function(d,s) { return d.stroke; })
            .style("stroke", "#FFF")
            .style("fill", "none");
    };
    update();

    linkSelection.exit().remove();

    // bind the data array to the svg selection, with a key function
    nodeSelection = nodeSelection.data(filteredNodes, function(d) { return d.id; });
    nodeSelected = nodeSelection.data(filteredNodes);
    // draw new nodes
    var node = nodeSelection.enter()
      .append("g")
      .attr("class","node")
      .call(force.drag);

    node.append("circle")
      .attr("class", "dot") // you have to do this or you can't re-select it!
      .attr("r", function(d, i) { return d.groupyear ? radius[d.groupyear] : 10; }); // if no groupyear, then it's a category, so size 7

    node.append("text")
      .attr("dx", 15)
      .attr("dy",5)
      .attr("spacing", 15)
      .text(function(d) {return d.name});

    node.append("text")
        .attr("class","textcategory")
        .attr("dx", 15)
        .attr("dy",5)
        .attr("spacing", 15)
        .text(function(d) {return d.category});

    // remove old nodes
    nodeSelection.exit().remove();
    // console.log("nodeSelected", nodeSelected);

  //  function using includes to evaluate if some of node.groupcontinents exists in includeGroupcontinents
  function isInGpc(element, index, array) {
    return includeGroupcontinents.includes(element);
  }

  //  function using includes to evaluate if some of node.groupindustry exists in includeGroupindustries
  function isInGpi(element, index, array) {
    return includeGroupindustries.includes(element);
  }


  // filters the dots
  function filterNode(node) {
    var dropdownr = d3.select("#pickr")
    var colornumber = dropdownr.node().selectedIndex;

    if (colornumber == 1) {
      var matchesGroupindustries = (typeof node.groupindustry == "undefined") || (includeGroupindustries.length === 0 ? node.groupindustry.length > 1 : node.groupindustry.some(isInGpi));
      return matchesGroupindustries;
    }
    else if (colornumber == 2) {
      var matchesGroupcontinents = (typeof node.groupcontinent == "undefined") || (includeGroupcontinents.length === 0 ? node.groupcontinent.length > 1 : node.groupcontinent.some(isInGpc));
      return matchesGroupcontinents;
    }
    else if (colornumber == 3) {
      var matchesGroupstatus = (typeof node.groupstatus == "undefined") || includeGroupstatus.includes(node.groupstatus);
      return matchesGroupstatus;
    }
    else if(colornumber == 4) {
      var matchesGroupyear = (typeof node.groupyear == "undefined") || includeGroupyears.includes(node.groupyear);
      return matchesGroupyear;
    }
    else {
      var matchesGroupyear = (typeof node.groupyear == "undefined") || includeGroupyears.includes(node.groupyear);
      var matchesGroupindustries = (typeof node.groupindustry == "undefined") || (includeGroupindustries.length === 0 ? node.groupindustry.length > 1 : node.groupindustry.some(isInGpi));
      var matchesGroupcontinents = (typeof node.groupcontinent == "undefined") || (includeGroupcontinents.length === 0 ? node.groupcontinent.length > 1 : node.groupcontinent.some(isInGpc));
      var matchesGroupstatus = (typeof node.groupstatus == "undefined") || includeGroupstatus.includes(node.groupstatus);
      return (matchesGroupyear && matchesGroupindustries && matchesGroupcontinents && matchesGroupstatus)
    }
    // console.log('includeGroupstatus', includeGroupstatus);
    // console.log('includeGroupcontinents', includeGroupcontinents);
    // console.log('node.groupcontinent', node.groupcontinent);
    // console.log('matchesGroupcontinents', matchesGroupcontinents);
  }

  // get the id name and number of the selected link to color accordingly the selected dots
  var dropdownr = d3.select("#pickr")
  var colorid = dropdownr.node().options[dropdownr.node().selectedIndex].value;
  var colornumber = dropdownr.node().selectedIndex;
  // console.log("this is my colorid", dropdownr.node().options[dropdownr.node().selectedIndex]);
  // console.log("this is my colornumber", colornumber);

  // the colouring code throws error because it is looking for .groupsomething data in the category nodes?
  if (colornumber == 1) {
    d3.selectAll("circle").style("fill", function(d,i) { return typeof d == "undefined" ? "white" : colorindustry[d.groupindustry] });
  }
  else if (colornumber == 2) {
    d3.selectAll("circle").style("fill", function(d,i) { return typeof d == "undefined" ? "white" : colorcontinent[d.groupcontinent] });
  }
  else if (colornumber == 3) {
    d3.selectAll("circle").style("fill", function(d,i) { return typeof d == "undefined" ? "white" : colorstatus[d.groupstatus] });
  }
  else if (colornumber == 4) {
    d3.selectAll("circle").style("fill", function(d,i) { return typeof d == "undefined" ? "white" : coloryear[d.groupyear] });
  }
  else {
    d3.selectAll("circle").style("fill", "white") };
  }

  // called by force layout during iteration
  function tick() {
    linkSelection.attr("d", arcPath);
    nodeSelection.attr("transform", function(d) {
        return "translate("
        + d.x + ","
        + d.y + ")";
    });
  }

  // draw SVG arc for link _d_, per http://bl.ocks.org/mbostock/1153292
  function arcPath(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
  }

  function trimLinks(links, nodeIds) {
    results = [];
    var results = links.filter(function(link) {
      return (nodeIds.includes(link.source.id) && nodeIds.includes(link.target.id));
    });
    return results;
  }

  // fetch data and (in the callback) load into the arrays
  d3.json("/offf/data/industry.json", function(error, json) {
    graph = json;
    // console.log('Fetched', graph);
    draw();
  });









  var dropdownl = d3.select("#pickl")
  var changesrc = function() {
    var source = dropdownl.node().options[dropdownl.node().selectedIndex].value;
    var legendcat = dropdownl.node().options[dropdownl.node().selectedIndex].dataset.legendcat;
    // $(".legendl").hide();
    // $(legendcat).show();
    d3.json(source, function(error, json) {
      graph = json; draw();
      // console.log("this is my option", dropdownl.node().options[dropdownl.node().selectedIndex]);
      // console.log("this is my first option", dropdownl.node().options[dropdownl.node().selectedIndex].value);
      // console.log("this is my second option", dropdownl.node().options[dropdownl.node().selectedIndex].dataset.legendcat);
    })
  }

  var dropdownr = d3.select("#pickr")
  var changecolor = function() {
    var legendcol = dropdownr.node().options[dropdownr.node().selectedIndex].dataset.legendcol;
    $(".legendr").hide();
    $(legendcol).show();

    $(".legendr").removeClass("nbr");
    $(legendcol).addClass("nbr");
  };

  function selectColor () {
    var pickrVal = $("#pickr").val();
    console.log("this is my pickrVal", pickrVal);

    if (pickrVal == "allIndustries") {
      includeGroupindustries = [0,1,2,3,4];
      draw();
    }
    else if (pickrVal == "allLocations") {
      includeGroupcontinents = [1,2,3,4,5];
      draw();
    }
    else if (pickrVal == "allStatus") {
      includeGroupstatus = [0,1,2,3,4];
      draw();
    }
    else if (pickrVal == "allYears") {
      includeGroupyears = [3,4,5];
      draw();
    }
  };
  // Add a class to the selected link
  $('.choicer li').click(function() {
          $('.choicer li').removeClass('selected');
          $(this).addClass('selected');
  });
  // Jquery function. When the dropdown pickr (right) is changed, the function changecolor starts
  $(function() {
    $('#pickr').change(function() {
      // dropdownr.on("changecolor", changecolor)
      changecolor();
      selectColor();
      });
  });
  // Jquery function. When the dropdown pickl (left) is changed, the function changesrc starts
  $(function() {
    $('#pickl').change(function() {
      // dropdownl.on("changesrc", changesrc)
      changesrc();
      });
  });
  // wire up the filters the hard way
  d3.select("#industryr1").on("click", function() {
    includeGroupindustries = [0];
    draw();
  });
  d3.select("#industryr2").on("click", function() {
    includeGroupindustries = [1];
    draw();
  });
  d3.select("#industryr3").on("click", function() {
    includeGroupindustries = [2];
    draw();
  });
  d3.select("#industryr4").on("click", function() {
    includeGroupindustries = [3];
    draw();
  });
  d3.select("#industryr5").on("click", function() {
    includeGroupindustries = [4];
    draw();
  });
  d3.select("#industryr6").on("click", function() {
    includeGroupindustries = [0,1,2,3,4];
    draw();
  });
  d3.select("#industryr7").on("click", function() {
    includeGroupindustries = [];
    draw();
  });
  d3.select("#yearr1").on("click", function(d,i) {
    includeGroupyears = [3];
    draw();
  });
  d3.select("#yearr2").on("click", function() {
    includeGroupyears = [4];
    draw();
  });
  d3.select("#yearr3").on("click", function() {
    includeGroupyears = [5];
    draw();
  });
  d3.select("#yearr4").on("click", function() {
    includeGroupyears = [3,4,5];
    draw();
  });
  d3.select("#locationr1").on("click", function() {
    includeGroupcontinents = [1];
    draw();
  });
  d3.select("#locationr2").on("click", function() {
    includeGroupcontinents = [2];
    draw();
  });
  d3.select("#locationr3").on("click", function() {
    includeGroupcontinents = [3];
    draw();
  });
  d3.select("#locationr4").on("click", function() {
    includeGroupcontinents = [4];
    draw();
  });
  d3.select("#locationr5").on("click", function() {
    includeGroupcontinents = [5];
    draw();
  });
  d3.select("#locationr6").on("click", function() {
    includeGroupcontinents = [1,2,3,4,5];
    draw();
  });
  d3.select("#locationr7").on("click", function() {
    includeGroupcontinents = [];
    draw();
  });
  d3.select("#statusr1").on("click", function() {
    includeGroupstatus = [0];
    draw();
  });
  d3.select("#statusr2").on("click", function() {
    includeGroupstatus = [1];
    draw();
  });
  d3.select("#statusr3").on("click", function() {
    includeGroupstatus = [2];
    draw();
  });
  d3.select("#statusr4").on("click", function() {
    includeGroupstatus = [3];
    draw();
  });
  d3.select("#statusr5").on("click", function() {
    includeGroupstatus = [4];
    draw();
  });
  d3.select("#statusr6").on("click", function() {
    includeGroupstatus = [0,1,2,3,4];
    draw();
  });
