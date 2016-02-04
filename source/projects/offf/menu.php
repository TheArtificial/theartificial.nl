<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>OFFF artists by industry, menu, left pannel</title>
        <script type="text/javascript" src="/offf/library/d3.js"></script>
        <link rel="stylesheet" type="text/css" href="/offf/stylesheets/mainstyle.css">
        <script src="/offf/library/jquery-2.2.0.min.js" type="text/javascript" > </script>

      	<script type="text/javascript">
      		$( document ).ready( function( ) {
      				$( '.tree li' ).each( function() {
      						if( $( this ).children( 'ul' ).length > 0 ) {
      								$( this ).addClass( 'parent' );
      						}
      				});
      				$( '.tree li.parent > a' ).click( function( ) {
      						$( this ).parent().toggleClass( 'active' );
      						$( this ).parent().children( 'ul' ).slideToggle( 'fast' );
      				});
      				$( '#all' ).click( function() {

      					$( '.tree li' ).each( function() {
      						$( this ).toggleClass( 'active' );
      						$( this ).children( 'ul' ).slideToggle( 'fast' );
      					});
      				});
      				$( '.tree li' ).each( function() {
      						$( this ).toggleClass( 'active' );
      						$( this ).children( 'ul' ).slideToggle( 'fast' );
      				});
      		});
          
      	</script>
    </head>


    <body>
      <div id="leftpanel">

        <div class="event">
            <a href="http://www.offf.ws/artists/"><img src="/offf/images/offf-logo.png" alt="offf-logo"/></a>
            <h2>WHO ARE OFFF ARTISTS ?</h2>
            <p>OFFF is a three-day festival annually hosting innovative, creative and international speakers for conferences, workshops, activities and performances in Barcelona.</p>
        </div>

            <div class="tree">
              	<ul>
              			<li><a>INDUSTRY</a>
              				<ul> <li> <h3>Which industries are the most represented at OFFF?</h3>
<h4> Multi-discipinary studios are the most common artists at OFFF. Isolated, on the edges of the data-viz, we notice that product designers and sound design artists are not so represented. Most artists are pluridisciplinaries, however, the most represented one-industry artist are print artists.</li> </ul>
</h4></ul>
            </div>
            <div class="tree">
              	<ul>
              			<li><a>LOCATION</a>
              				<ul> <li><h3> Where are OFFF artists working from? </h3>
                      <h4> interpretation goes here </h4>
                    </li> </ul>
                </ul>
            </div>
            <div class="tree">
              	<ul>
              			<li><a href="/offf/recurrence.html">RECURRENCE</a>
              				<ul> <li>
                        <h3> Which artists came two years in a row?</h3>
                        <h4> interpretation goes here </h4>
                      </li> </ul>
                </ul>
            </div>
            <div class="tree">
              	<ul>
              			<li><a>STRUCTURE</a>
              				<ul> <li> <h3> What is OFFF's artists status? </h3>
                      <h4> interpretation goes here </h4>
                      </li> </ul>
                </ul>
            </div>
          </div>

<div id="rightpanel">
          <div class="tree">
             <ul>
                 <li id="continent0"><a>CONTINENT</a>
                   <ul>
                     <li id="continent1"><a>Africa</a></li>
                     <li id="continent2"><a>Asia</a></li>
                     <li id="continent3"><a>Australia</a></li>
                     <li id="continent4"><a>Europe</a></li>
                     <li id="continent5"><a>North America</a></li>
                     <li id="continent6"><a>South America</a></li>
                   </ul>
                 </li>
             </ul>
         </div>
        <div class="tree">
          	<ul>
          			<li id="year0"><a>YEAR</a>
          				<ul>
          					<li id="year1" input type="button"><a>2015</a></li>
          					<li id="year2"><a>2016</a></li>
          					<li id="year3"><a>2015 and 2016</a></li>
                    <li id="year4"><a>any</a></li>
          				</ul>
          			</li>
          	</ul>
       </div>
        <div class="tree">
             <ul>
                 <li id="status0"><a>STATUS</a>
                   <ul>
                     <li id="status1"><a>Independant</a></li>
                     <li id="status2"><a>Represented</a></li>
                     <li id="status3"><a>Agency</a></li>
                   </ul>
                 </li>
             </ul>
        </div>

    <div id="label0">

      <div class="label1">
            <svg class="icons" svg width="32" height="32" viewBox="0 0 32 32">
            <style type="text/css">
            </style>
            <path d="M21.461,6.858L21.461,6.858c0,0-0.001,0-0.001,0C19.858,6.326,18.048,6,16,6
              c-2.048,0-3.858,0.326-5.46,0.857c0,0,0,0,0,0l0,0C4.484,8.867,1.471,13.89,0.432,16.02c-0.3,0.616-0.276,1.334,0.081,1.918
              C1.923,20.244,6.403,26,16,26s14.077-5.756,15.487-8.062c0.357-0.585,0.382-1.302,0.081-1.918
              C30.529,13.89,27.516,8.867,21.461,6.858z M11.012,7.758C12.482,7.284,14.14,7,16,7c1.811,0,3.547,0.281,4.984,0.754
              C22.903,9.285,24,11.552,24,14c0,4.411-3.589,8-8,8s-8-3.589-8-8C8,11.554,9.096,9.289,11.012,7.758z M16,25
              c-9.181,0-13.359-5.452-14.64-7.58c-0.172-0.286-0.187-0.635-0.04-0.935c0.832-1.701,3.096-5.525,7.415-7.763
              c-1.117,1.529-1.775,3.413-1.733,5.462c0.097,4.734,4.025,8.69,8.759,8.812C20.841,23.128,25,19.05,25,14
              c0-1.998-0.665-3.832-1.769-5.324c4.386,2.227,6.636,6.086,7.459,7.808c0.143,0.298,0.127,0.642-0.044,0.926
              C29.37,19.534,25.194,25,16,25z M11.159,12.809C11.064,13.192,11,13.587,11,14c0,2.761,2.239,5,5,5s5-2.239,5-5s-2.239-5-5-5
              c-0.916,0-1.763,0.259-2.497,0.693C13.136,9.272,12.602,9,12,9c-1.105,0-2,0.895-2,2C10,11.803,10.476,12.491,11.159,12.809z M14,11
              c0-0.144-0.017-0.284-0.046-0.419C14.555,10.22,15.25,10,16,10c2.206,0,4,1.794,4,4s-1.794,4-4,4s-4-1.794-4-4
              c0-0.352,0.051-0.691,0.14-1.014C13.178,12.913,14,12.056,14,11z M12,10c0.552,0,1,0.448,1,1c0,0.552-0.448,1-1,1s-1-0.448-1-1
              C11,10.448,11.448,10,12,10z"></path>
            </svg>
          <p><a>Show labels</a></p>
      </div>

      <div class="label2">
            <svg class="icons" svg width="32" height="32" viewBox="0 0 32 32">
            <style type="text/css">
            </style>
            <path d="M31.488,17.932c0.35-0.572,0.388-1.278,0.096-1.882C30.291,13.381,25.83,6,16,6
              S1.709,13.381,0.416,16.051c-0.292,0.603-0.255,1.31,0.096,1.882c0.627,1.024,1.864,2.733,3.886,4.315l-1.424,1.697
              c-0.177,0.211-0.15,0.527,0.062,0.704h0c0.211,0.177,0.527,0.15,0.704-0.062l1.472-1.753c1.194,0.825,2.622,1.576,4.311,2.143
              l-0.835,2.292c-0.094,0.259,0.039,0.546,0.299,0.641l0,0c0.259,0.094,0.546-0.039,0.64-0.299l0.852-2.34
              c1.485,0.41,3.153,0.67,5.021,0.712V28.5c0,0.276,0.224,0.5,0.5,0.5h0c0.276,0,0.5-0.224,0.5-0.5v-2.517
              c1.868-0.042,3.536-0.303,5.021-0.712l0.852,2.34c0.094,0.259,0.381,0.393,0.64,0.299l0,0c0.259-0.094,0.393-0.381,0.299-0.641
              l-0.835-2.292c1.689-0.568,3.118-1.318,4.311-2.143l1.472,1.753c0.177,0.211,0.493,0.239,0.704,0.062l0,0
              c0.211-0.177,0.239-0.493,0.062-0.704l-1.424-1.697C29.624,20.665,30.861,18.956,31.488,17.932z M16,25
              c-9.181,0-13.359-5.452-14.64-7.58c-0.172-0.286-0.187-0.633-0.041-0.934C2.527,14.007,6.759,7,16,7
              c9.332,0,13.493,6.973,14.686,9.475c0.144,0.302,0.126,0.648-0.049,0.933C29.344,19.519,25.106,25,16,25z"></path>
            </svg>
          <p><a>Hide labels</a></p>
      </div>
    </div>


    <script type="text/javascript">
    //Change filter text class when divId is selected
    $('#year0 li').click(function() {
        $('.tree li').removeClass('selected');
        $(this).addClass('selected');
    });
    $('#continent0 li').click(function() {
        $('.tree li').removeClass('selected');
        $(this).addClass('selected');
    });
    $('#structure0 li').click(function() {
        $('.tree li').removeClass('selected');
        $(this).addClass('selected');
    });
      //jquery function to hide and show label button
      $(".label2").hide();
      $("#label0").on('click', function() {
        $(".label1, .label2").toggle();
      });
    </script>
