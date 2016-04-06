function fetch(ID, Description, Problem, Key, Count, CustomTime) {
     
	var apiUrl = 'http://api.uptimerobot.com/getMonitors?logs=1&format=xml&responseTimes=1&responseTimesAverage=30&apiKey=' + Key;
	 
	if (CustomTime) {apiUrl += '&customUptimeRatio=' + CustomTime;}
	 
	$.ajax({
		type: "GET",
		url: apiUrl,
		dataType: "xml",
		success: function(xml) {
		 //remainder of the code
			//console.log(xml);
			$(xml).find('monitor').each(function(){
                    var name = $(this).attr("friendlyname");
                    //console.log(name);
					
					var html = '';
	
					html += '<div class="col span_1_of_' + Count +'" data-index="'+ ID +'">';
					html += '<a href="' + $(this).attr('url') + '"><img height="100px" src="' + $(this).attr('id') + '.png" alt="' + $(this).attr('friendlyname') + '"></a>'
					html += '<h2>' + $(this).attr('friendlyname') + '</h2>';
					
					if ($(this).attr('status') == 2) {
						var direction = 'up';
						var status = 'Online';
					} else if ($(this).attr('status') == 9) {
						var direction = 'down';
						var status = 'Offline';
					} else if ($(this).attr('status') == 8) {
						var direction = 'level';
						var status = 'Experiencing Difficulties';
					} else if ($(this).attr('status') == 0) {
						var direction = 'none';
						var status = 'Paused';
					} else if ($(this).attr('status') == 1) {
						var direction = 'none';
						var status ='Not Checked Yet';
					} else {
						var direction = 'down';
						var status = 'AWOL';
					}
					
					html += '<p class="equalize box">' + Description;
					if (status != 'Online') {
						if (Description && status != 'Online') { html +='<br>';}
						html += '<span class="red">' + Problem + '</span>';
					}
					html += '</p>';
					
					html += '<h3 class="box ' + direction + '">' + status + '</h3>';
					
					if (CustomTime) {
						if ($(this).attr('customuptimeratio') >= 99) {
							direction = 'up';
						} else if ($(this).attr('customuptimeratio') >= 90) {
							direction = 'level';
						} else {
							direction = 'down';
						}
						html += '<h4 class="boxed ' + direction + '">' + $(this).attr('customuptimeratio') + '% Uptime</h4>';
					} else {
						if ($(this).attr('alltimeuptimeratio') >= 99) {
							direction = 'up';
						} else if ($(this).attr('alltimeuptimeratio') >= 90) {
							direction = 'level';
						} else {
							direction = 'down';
						}
						html += '<h4 class="boxed ' + direction + '">' + $(this).attr('alltimeuptimeratio') + '% Uptime</h4>';
					}
					
					html += '<div class="breaker"></div>';
					
					/* Chart Data */
					var chartdata = [
						{
							label: 'Tiempo de Respuesta',
							strokeColor: '#f3f3f3',
							data: []
						}];
					
					var maxy = 0;
					var lastResponse = 0;
					
					$(this).find("responsetime").each(function(){
						/*html += '<h5>Response Time</h5>';
						html += '<h6 class="boxed';
						if ($(this).attr('value') > 300){ html += ' down'; }
						else { html += ' up'; }
						html += ' faded">' + $(this).attr('value') + ' ms' + ' &nbsp;&middot;&nbsp; ' + $(this).attr('datetime') + '</h6>';
						html += '<div class="breaker"></div>';*/
						chartdata[0].data.push({
									x: new Date($(this).attr('datetime')),
									y: $(this).attr('value')
								});
						
						if($(this).attr('value')>maxy){maxy = $(this).attr('value');}
					});
					
					/* Chart DOM */
					if(maxy>0){
						lastResponse = $(this).find("responsetime").first().attr('value');
						//html +=  '<h5>Tiempo de Respuesta</h5>';
						html += '<h5 class="equalize boxed up noborder">' + lastResponse + ' ms</h5>';
						html += '<div class="boxed"><div><canvas id="chart-' + $(this).attr('id') + '" ></canvas></div></div>';
						html += '<div class="breaker xl"></div>';
					}
					
					html +=  '<h5>Eventos</h5>';
					
					$(this).find("log").each(function(){
						if ($(this).attr('type') == 2) {
							direction = 'up';
							status = 'Online';
						} else if ($(this).attr('type') == 1) {
							direction = 'down';
							status = 'Offline';
						} else if ($(this).attr('type') == 98) {
							direction = 'none';
							status ='Started';
						} else if ($(this).attr('type') == 99) {
							direction = 'level';
							status = 'Paused';
						} else {
							direction = 'down';
							status = 'AWOL';
						}
						html += '<h6 class="boxed noborder ' + direction + ' faded">' + status + ' &nbsp;&middot;&nbsp; ' + $(this).attr('datetime') + '</h6>';					
					});
					
					html += '</div>';
					
					//Add to the DOM	
					$("#maincontent .section").append(html);
					
					//Draw chart
					if(maxy>0){
						var ctx = $("#chart-" + $(this).attr('id')).get(0).getContext("2d");
						var myNewChart = new Chart(ctx).Scatter(chartdata, {
							bezierCurve: true,
							animation: false,
							scaleShowLabels: false,
							scaleLineColor: "white",
							showTooltips: true,
							scaleLabel: "<%=value%> ms",
							responsive: true,
							// GRID LINES
							scaleShowGridLines: false,					
							// VERTICAL SCALE RANGE
							scaleOverride: true,
							scaleSteps: 4,
							scaleStepWidth: 1000 + Math.round(maxy/1000)*1000/4,
							scaleStartValue: 0,						
							// DATE SCALE
							scaleTimeFormat: "HH'h'",
							scaleDateFormat: "dddd",
							scaleDateTimeFormat: "HH:MM, dd/mm/yyyy",
							scaleType: "date",
							// LINES
							datasetPointStrokeColor: '#f9f9f9',
							datasetStrokeWidth: 4,
							// POINTS
							pointDotRadius: 0,
							// TEMPLATE
							//tooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%=valueLabel%>; <%=argLabel%>"
							tooltipTemplate: "<%=valueLabel%>; <%=argLabel%>",
							multiTooltipTemplate: "<%=valueLabel%>; <%=argLabel%>"
						});
					}					
					
					//How many are there
					var displayed = $("#maincontent .section .col").length;
					//console.log(displayed);
										
					//Order displayed on last element
					if(displayed == Count){
						//console.log('Ordering elements');
						var sorted = $('#maincontent .section .col').sort(function (a, b) {
						  var contentA = parseInt($(a).attr('data-index'));
						  var contentB = parseInt($(b).attr('data-index'));
						  return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
					   });
					   $("#maincontent .section").empty();	
					   $("#maincontent .section").append(sorted);	
					}									
					
					//Correct display
					$(function(){
						equalize();
						//downBoy();
					})

                });
		}
	});
	
}


var IDs = [
	'777619939',
	'777605993',
	'777605997',
	'777605998',
	'777606001'
];

var ApiKeys = [
	'm777619939-149cfd15699773cbbf493e17',
	'm777605993-fe471da267567bbbdd89223d',
	'm777605997-d184e7177fba16f4f2c9b6ab',
	'm777605998-a84aa45ca6e4788e0d23a798',
	'm777606001-04fe1620e33b30ec7be8d1e0'
];

var Descriptions = [
	'Conectividad con Internet',
	'Entorno de producción',
	'Entorno de preproducción',
	'Entorno de desarrollo privado',
	'Entorno de desarrollo público'
];

var Apologies = [
	'There has been an error, have you felt it?',
	'Our website is down, you will not be able to sign up. Sorry!',
	'Trained bees have been dispatched to fix our over-heating servers.',
	'Area 69 has been retired.',
	'The aliens appear to have escaped. You shall be vaporised in vengeance shortly.'
];

var CustomTime = false;
var Title = 'Nexus';

$( document ).ready(function() {
    console.log( "ready!" );
	for (i = 0; i < ApiKeys.length; i++) { 
		fetch(i+1, Descriptions[i], Apologies[i], ApiKeys[i], ApiKeys.length, CustomTime);
	}	
});
