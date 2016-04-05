<!DocType html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta http-equiv="cleartype" content="on">
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
		<meta name="keywords" content="Network Status of the Nexus Services">
		<meta name="description" content="Network Status of the Nexus Services">
		<title>Estado de los Servicios Nexus</title>
		<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic">
		<link rel="stylesheet" href="style.css">
		<script>var jQl={q:[],dq:[],gs:[],ready:function(a){'function'==typeof a&&jQl.q.push(a);return jQl},getScript:function(a,c){jQl.gs.push([a,c])},unq:function(){for(var a=0;a<jQl.q.length;a++)jQl.q[a]();jQl.q=[]},ungs:function(){for(var a=0;a<jQl.gs.length;a++)jQuery.getScript(jQl.gs[a][0],jQl.gs[a][1]);jQl.gs=[]},bId:null,boot:function(a){'undefined'==typeof window.jQuery.fn?jQl.bId||(jQl.bId=setInterval(function(){jQl.boot(a)},25)):(jQl.bId&&clearInterval(jQl.bId),jQl.bId=0,jQl.unqjQdep(),jQl.ungs(),jQuery(jQl.unq()), 'function'==typeof a&&a())},booted:function(){return 0===jQl.bId},loadjQ:function(a,c){setTimeout(function(){var b=document.createElement('script');b.src=a;document.getElementsByTagName('head')[0].appendChild(b)},1);jQl.boot(c)},loadjQdep:function(a){jQl.loadxhr(a,jQl.qdep)},qdep:function(a){a&&('undefined'!==typeof window.jQuery.fn&&!jQl.dq.length?jQl.rs(a):jQl.dq.push(a))},unqjQdep:function(){if('undefined'==typeof window.jQuery.fn)setTimeout(jQl.unqjQdep,50);else{for(var a=0;a<jQl.dq.length;a++)jQl.rs(jQl.dq[a]); jQl.dq=[]}},rs:function(a){var c=document.createElement('script');document.getElementsByTagName('head')[0].appendChild(c);c.text=a},loadxhr:function(a,c){var b;b=jQl.getxo();b.onreadystatechange=function(){4!=b.readyState||200!=b.status||c(b.responseText,a)};try{b.open('GET',a,!0),b.send('')}catch(d){}},getxo:function(){var a=!1;try{a=new XMLHttpRequest}catch(c){for(var b=['MSXML2.XMLHTTP.5.0','MSXML2.XMLHTTP.4.0','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP'],d=0;d<b.length;++d){try{a= new ActiveXObject(b[d])}catch(e){continue}break}}finally{return a}}};if('undefined'==typeof window.jQuery){var $=jQl.ready,jQuery=$;$.getScript=jQl.getScript};</script>
		<!--[if lt IE 9]>
			<script>jQl.loadjQ('//cdn.jsdelivr.net/g/modernizr,selectivizr,prefixfree,jquery@1.11.0,jquery.equalize,jquery.downboy');</script>
		<![endif]-->
		<!--[if IE 9]><!-->
			<script>jQl.loadjQ('//cdn.jsdelivr.net/g/modernizr,prefixfree,jquery,jquery.equalize,jquery.downboy');</script>
		<!--<![endif]-->
		<script>
			$(function(){
				equalize();
				//downBoy();
				window.onresize = function() {
					equalize();
					//downBoy();
				}
			})
		</script>
		<script type="text/javascript" src="fetch.js"></script>
	</head>
	<body>
		<div id="skiptomain"><a href="#maincontent">skip to main content</a></div>
		<div id="headcontainer">
			<header>
				<!--<h5><a href="https://nexus.t-systems.es/"><img height="100px" src="nexus-circle-project.png" alt="Nexus"></a></h5>-->
				<h1>Estado de los Servicios</h1>
			</header>
		</div>
		<div id="maincontentcontainer">
			<div id="maincontent">
				<div class="section group">
					<!-- append monitors here -->
				</div>
			</div>
		</div>
		<div id="footercontainer">
			<footer class="section group">				
				<div class="col span_1_of_1"><p class="center"><a href="http://www.t-systems.es/"><img height="35px" src="TSY_Logo_W.png" alt="T-Systems Brand Logo"></a></div>
				<div class="col span_1_of_1">
					<p class="center">&copy; <?php echo date('Y');?>. Provided by <a href="http://www.t-systems.es/">T-Systems</a> using source code from <a href="https://github.com/eustasy/uptimerobot-status-page">eutasy</a> and powered by <a href="https://uptimerobot.com/">Uptime Robot</a>.</p>
				</div>
			</footer>
		</div>
	</body>
</html>
