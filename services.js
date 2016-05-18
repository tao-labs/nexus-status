function parseHero(hero, ID){
	
	var html = '';
	var bleed = '';
				
	html += '<div class="col span_1_of_1">';
	
	/*if($(hero).attr('type')==1){
		html += '<a href="' + $(hero).attr('url') + '"><img height="100px" src="' + $(hero).attr('id') + '.png" alt="' + $(hero).attr('friendlyname') + '"></a>'
	}else{
		html += '<img height="100px" src="' + $(hero).attr('id') + '.png" alt="' + $(hero).attr('friendlyname') + '">';
	}
	html += '<h2>' + $(hero).attr('friendlyname') + '</h2>';*/
	
	if ($(hero).attr('status') == 2) {
		var direction = 'up';
		var status = 'Online';
	} else if ($(hero).attr('status') == 9) {
		var direction = 'down';
		var status = 'Offline';
	} else if ($(hero).attr('status') == 8) {
		var direction = 'level';
		var status = 'Experiencing Difficulties';
	} else if ($(hero).attr('status') == 0) {
		var direction = 'none';
		var status = 'Paused';
	} else if ($(hero).attr('status') == 1) {
		var direction = 'none';
		var status ='Not Checked Yet';
	} else {
		var direction = 'down';
		var status = 'AWOL';
	}
	
	/*html += '<p class="equalize box">' + services[ID].description;
	if (status != 'Online') {
		if (services[ID].description && status != 'Online') { html +='<br>';}
		html += '<span class="red">' + services[ID].problem + '</span>';
	}
	html += '</p>';
	
	html += '<h3 class="box ' + direction + '">' + status + '</h3>';
	*/
	
	/*html += '<h2 class="boxed">Disponibilidad</h2>';*/
	
	if (CustomTime) {					
		var values = $(hero).attr('customuptimeratio').split('-');	
		
		for (i = 0; i < values.length; i++) { 
			if (values[i] >= 99) {
				var ratio = 'up';
			} else if (values[i] >= 90) {
				var ratio = 'level';
			} else {
				var ratio = 'down';
			}						
			html += '<div class="col span_1_of_' + (values.length) +'" style="opacity:' + (values.length - i)/values.length + '"><h4 class="boxed noborder ' + ratio + '">' + values[i] + '%</h4><h5>' + TimeTags[i] + '</h5></div>';
		}
		
	} else {
		if ($(hero).attr('alltimeuptimeratio') >= 99) {
			var ratio = 'up';
		} else if ($(hero).attr('alltimeuptimeratio') >= 90) {
			var ratio = 'level';
		} else {
			var ratio = 'down';
		}
		html += '<h4 class="boxed ' + ratio + '">' + $(hero).attr('alltimeuptimeratio') + '% Uptime</h4>';
	}
	
	/* Chart Data */
	var chartdata = [
		{
			label: 'Tiempo de Respuesta',
			strokeColor: '#d0d0d0',
			//strokeColor: '#333',
			//pointColor: 'f9f9f9',
			//pointStrokeColor: '#333',
			data: []
		}];
	
	/* Chart.js v2 data */
	var data2 = {
		labels: [],
		datasets: [
			{
				label: "Tiempo de Respuesta",				
				data: [],
				pointHoverBackgroundColor: "white",
				pointHoverBorderColor: "#555",
			}
		]
	};
	
	var maxy = 0;
	var miny = 999999;
	var centery = 0;
	var average = 0;
	var lastResponse = 0;
	var magnitude = 0;
	
	$(hero).find("responsetime").each(function(){
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
		
		data2.labels.push(new Date($(this).attr('datetime')));
		data2.datasets[0].data.push($(this).attr('value'));
		
		if($(this).attr('value')>maxy){maxy = $(this).attr('value');}
		if($(this).attr('value')<miny){miny = $(this).attr('value');}
		average = parseInt(average) + parseInt($(this).attr('value'));
	});
	
	/* Chart DOM */
	if(maxy>0){
		average = average / $(hero).find("responsetime").length;
		centery = (parseInt(maxy) + parseInt(miny)) / 2
		var order = Math.floor(Math.log(centery) / Math.LN10 + 0.000000001); // because float math sucks like that
			magnitude = Math.pow(10,order);
		lastResponse = $(hero).find("responsetime").first().attr('value');
		//html +=  '<h5>Tiempo de Respuesta</h5>';	
		//html += '<div class="breaker xl clear"></div>';
		
		/*html += '<div class="col span_1_of_1"><h2 class="boxed">Tiempo medio de respuesta</h2>';			
		
		html += '<div class="col span_1_of_' + (values.length) +' centered"><h4 class="boxed noborder ' + direction + '">' + lastResponse + 'ms</h4><h5>' + moment($(hero).find("responsetime").first().attr('datetime')).fromNow() + '</h5></div>';		
		
		html += '</div>';*/
		
		
		
		/*bleed += '<p class="equalize box">' + services[ID].description;
		if (status != 'Online') {
			if (services[ID].description && status != 'Online') { html +='<br>';}
			bleed += '<span class="red">' + services[ID].problem + '</span>';
		}
		bleed += '</p>';*/
		
		//Title
		//bleed += '<h2>' + $(hero).attr('friendlyname') + '</h2>';
		
		//Section
		bleed += '<div class="section group bleed">';		
		
		//Description and logo
		bleed += '<div class="col span_3_of_6">';
		bleed += '<h2 class="boxed left">'
		if($(hero).attr('type')==1){
			bleed += '<a class="floatleft" href="' + $(hero).attr('url') + '"><img height="100px" src="' + $(hero).attr('id') + '.png" title="' + services[ID].description + '" alt="' + $(hero).attr('friendlyname') + '"></a>'
		}else{
			bleed += '<img class="floatleft" height="100px" src="' + $(hero).attr('id') + '.png" title="' + services[ID].description + '" alt="' + $(hero).attr('friendlyname') + '">';
		}
		bleed += '</h2>';
		bleed += '</div>';

		//Status
		bleed += '<div class="col span_1_of_6">';
		bleed += '<h4 class="boxed noborder ' + direction + '">' + status + '</h4><h5>estado</h5>';
		bleed += '</div>';
		
		//Last response
		bleed += '<div class="col span_1_of_6">';		
		bleed += '<h4 class="boxed noborder ' + direction + '">' + lastResponse + 'ms</h4><h5>Respuesta (' + moment($(hero).find("responsetime").first().attr('datetime')).fromNow() + ')</h5></div>';
				
		//Ratio
		bleed += '<div class="col span_1_of_6">';	
		bleed += '<h4 class="boxed noborder ' + ratio + '">' + $(hero).attr('alltimeuptimeratio') + '%</h4><h5>disponibilidad (acumulada)</h5></div>';	
						
		//Chart
		bleed += '<div class="col span_1_of_1 chart">';
		bleed += '<div><canvas width="600" height="100" id="chart-' + $(hero).attr('id') + '" ></canvas></div>';
		bleed += '</div>';
		/*
		bleed += '<div class="col span_1_of_4">';		
		bleed += '<h4 class="boxed noborder ' + direction + '">' + lastResponse + 'ms</h4><h5>' + moment($(hero).find("responsetime").first().attr('datetime')).fromNow() + '</h5></div>';
		*/
		
		bleed += '</div>';
		
	}	
	
	html += '</div>';
	
	//Add to the DOM	
	//$("#maincontent .section").append(html);
	$("#maincontent").after(bleed);
	
	//Draw chart
	if(maxy>0){
		//console.log("maxy: "+maxy+" / miny: "+miny+" / centery: "+centery+" / magnitude: "+magnitude);
		var ctx = $("#chart-" + $(hero).attr('id')).get(0).getContext("2d");
		/*var myNewChart = new Chart(ctx).Scatter(chartdata, {
			bezierCurve: true,
			animation: false,
			//showScale: true,
			scaleShowLabels: false,
			scaleLineColor: 'transparent',
			showTooltips: true,
			scaleLabel: "<%=value%> ms",
			responsive: true,
			// GRID LINES
			scaleShowGridLines: false,					
			// VERTICAL SCALE RANGE
			//scaleOverride: true,
			scaleSteps: 2,
			//scaleStepWidth: magnitude + Math.round(maxy/magnitude)*magnitude/4,
			//scaleStartValue: 0,
			scaleStepWidth: magnitude * 2,
			scaleStartValue: average - magnitude*2,	
			// DATE SCALE
			scaleTimeFormat: "HH'h'",
			scaleDateFormat: "ddd",
			scaleDateTimeFormat: "HH:MM",
			scaleType: "date",
			// LINES
			//datasetPointStrokeColor: '#f9f9f9',
			datasetStrokeWidth: 4,
			// POINTS
			pointDotRadius: 5,
			// TEMPLATE
			//tooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%=valueLabel%>; <%=argLabel%>"
			tooltipTemplate: "Response time: <%=valueLabel%> (<%=argLabel%>)",
			multiTooltipTemplate: "Response time: <%=valueLabel%> (<%=argLabel%>)"
		});*/
		var heroChart2 = new Chart(ctx, {
			type: 'line',
			data: data2,
			options: {
				scales: {
					xAxes: [{
						type: 'time',
						position: "bottom",
						time: {
							// string/callback - By default, date objects are expected. You may use a pattern string from http://momentjs.com/docs/#/parsing/string-format/ to parse a time string format, or use a callback function that is passed the label, and must return a moment() instance.
							parser: false,
							
							// string - By default, unit will automatically be detected.  Override with 'week', 'month', 'year', etc. (see supported time measurements)
							unit: 'hour',

							// Number - The number of steps of the above unit between ticks
							unitStepSize: 1,

							// string - By default, no rounding is applied.  To round, set to a supported time unit eg. 'week', 'month', 'year', etc.
							round: 'hour',

							// Moment js for each of the units. Replaces `displayFormat`
							// To override, use a pattern string from http://momentjs.com/docs/#/displaying/format/
							displayFormats: {
								'millisecond': 'SSS [ms]',
								'second': 'h:mm:ss a', // 11:20:01 AM
								'minute': 'h:mm:ss a', // 11:20:01 AM
								//'hour': 'MMM D, hA', // Sept 4, 5PM
								'hour': "HH[h]",
								'day': 'll', // Sep 4 2015
								'week': 'll', // Week 46, or maybe "[W]WW - YYYY" ?
								'month': 'MMM YYYY', // Sept 2015
								'quarter': '[Q]Q - YYYY', // Q3
								'year': 'YYYY', // 2015
							},
							
							
							// Sets the display format used in tooltip generation
							tooltipFormat: 'HH:mm - dddd DD/MM/YYYY',
						},													
						gridLines:{							
							tickMarkLength: 10,
							//color: '#f0f0f0',
							color: 'transparent',
							//zeroLineColor: '#f0f0f0',
							zeroLineColor: 'transparent',
							drawTicks: false,
							offsetGridLines: true,
						},
						ticks:{
							autoSkip: false,
							fontColor: '#d0d0d0',
						}
					}],
					yAxes: [{
						display: false,					
					}]
				},
				tooltips: {
					callbacks: {
						label: function(tooltipItems, data) { 
							return tooltipItems.yLabel + ' ms';
						}
					}
                }
			}
		});
	}
	
}

function getService(ID, Service, Count, CustomTime) {
     
	var apiUrl = 'http://api.uptimerobot.com/getMonitors?logs=1&format=xml&responseTimes=1&responseTimesAverage=60&logsLimit=4&apiKey=' + Service.apikey;
	 
	if (CustomTime) {apiUrl += '&customUptimeRatio=' + CustomTime;}
	 
	$.ajax({
		type: "GET",
		url: apiUrl,
		dataType: "xml",
		success: function(xml) {

			$(xml).find('monitor').each(function(){
                
				if ($(this).attr('status') == 2) {
					var direction = 'up';
					var status = 'Disponible';
					var icon = 'done';
					statuses.up ++;
				} else if ($(this).attr('status') == 9) {
					var direction = 'down';
					var status = 'Fuera de servicio';
					var icon = 'done';
					statuses.down ++;
				} else if ($(this).attr('status') == 8) {
					var direction = 'level';
					var status = 'Con dificultades';
					var icon = 'done';
					statuses.difficulties ++;
				} else if ($(this).attr('status') == 0) {
					var direction = 'none';
					var status = 'En mantenimiento';
					var icon = 'done';
					statuses.paused ++;
				} else if ($(this).attr('status') == 1) {
					var direction = 'none';
					var status ='Sin monitorizar';
					var icon = 'done';
					statuses.unchecked ++;
				} else {
					var direction = 'down';
					var status = 'AWOL';
					var icon = 'done';
					statuses.unchecked ++;
				}
				
				var name = $(this).attr("friendlyname");
					
				var html = '';
				
				html += '<div class="component-container border-color is-group" data-index="'+ ID +'">';
					
					html += '<div class="component-inner-container ' + direction + '">';
					
						html += '<i class="material-icons trigger">expand_more</i>';
						
						html += '<span class="name"><b>' + name + '</b> ' + Service.description + '</span>';
						
						html += '<span class="component-status ' + direction + '">' + status + '<i class="material-icons">' + icon + '</i></span>';
						
						if (!CustomTime) {
						
							if ($(this).attr('alltimeuptimeratio') >= 99) {
								var ratio = 'up';
							} else if ($(this).attr('alltimeuptimeratio') >= 90) {
								var ratio = 'level';
							} else {
								var ratio = 'down';
							}
							
							html += '<span class="component-ratio ' + ratio + '">' + $(this).attr('alltimeuptimeratio') + '% <i class="material-icons">linear_scale</i></span>';
							
							//add to averages
								averages.alltime = (parseFloat(averages.alltime)+parseFloat($(this).attr('alltimeuptimeratio'))).toFixed(2);
						
						}
				
					html += '</div>';
					
					html += '<div class="child-components-container">';
					
						html += '<div class="childs-inner-container">';
						
							if (CustomTime) {
								
								html += '<div class="component-inner-container color-secondary">';
								
								var values = $(this).attr('customuptimeratio').split('-');
								var lastResponse = $(this).find("responsetime").first().attr('value');
								
								html += '<div class="ratio-column span_1_of_' + (values.length + 2) +'"><h6 class="boxed noborder ' + direction + '">' + lastResponse + 'ms</h6><span>' + moment($(this).find("responsetime").first().attr('datetime')).fromNow() + '</span></div>';							
								
								for (i = 0; i < values.length; i++) { 
									if (values[i] >= 99) {
										var ratio = 'up';
									} else if (values[i] >= 90) {
										var ratio = 'level';
									} else {
										var ratio = 'down';
									}						
									html += '<div class="ratio-column span_1_of_' + (values.length + 2) +'" style="opacity:' + (values.length + 1 - i)/(values.length + 1) + '"><h6 class="boxed noborder ' + ratio + '">' + values[i] + '%</h6><span>' + TimeTags[i] + '</span></div>';
									
								}
								
								//add to averages
								averages.daily = (parseFloat(averages.daily)+parseFloat(values[0])).toFixed(2);
								averages.weekly = (parseFloat(averages.weekly)+parseFloat(values[1])).toFixed(2);
								averages.monthly = (parseFloat(averages.monthly)+parseFloat(values[2])).toFixed(2);
								averages.quarterly = (parseFloat(averages.quarterly)+parseFloat(values[3])).toFixed(2);
								
								if ($(this).attr('alltimeuptimeratio') >= 99) {
									ratio = 'up';
								} else if ($(this).attr('alltimeuptimeratio') >= 90) {
									ratio = 'level';
								} else {
									ratio = 'down';
								}
								
								html += '<div class="ratio-column span_1_of_' + (values.length + 2) +'" style="opacity:' + (1)/(values.length + 1) + '"><h6 class="boxed noborder ' + ratio + '">' + $(this).attr('alltimeuptimeratio') + '%</h6><span>' + TimeTags[values.length] + '</span></div>';
								
								//add to averages
								averages.alltime = (parseFloat(averages.alltime)+parseFloat($(this).attr('alltimeuptimeratio'))).toFixed(2);
																
								html += '</div>';
								
							}						
							
						
							$(this).find("log").each(function(){
								if ($(this).attr('type') == 2) {
									direction = 'up';
									status = 'Online';
									icon = 'trending_up';
								} else if ($(this).attr('type') == 1) {
									direction = 'down';
									status = 'Offline';
									icon = 'trending_down';
								} else if ($(this).attr('type') == 98) {
									direction = 'none';
									status ='Started';
									icon = 'add_to_queue';
								} else if ($(this).attr('type') == 99) {
									direction = 'level';
									status = 'Paused';
									icon = 'remove_from_queue';
								} else {
									direction = 'down';
									status = 'AWOL';
									icon = 'arrow_forward';
								}
								
								html += '<div class="component-inner-container color-secondary">';		
								
									html += '<i class="material-icons">schedule</i> ' + moment($(this).attr('datetime')).format('HH:mm - DD/MM/YYYY (dddd)'); 
									html += '<span class="component-status ' + direction + '">' + status + ' <i class="material-icons">' + icon + '</i></span>';
								
								html += '</div>';
							});
						
						html += '</div>';
						
					html += '</div>';
				
				html += '</div>';
				
				//Process Hero Monitor				
				if(Service.ishero){ parseHero(this, ID)};
								
				//Add to the DOM	
				$(".components-section .components-container").append(html);
				
				//How many are there?
				var displayed = $(".components-section .components-container .component-container").length;
									
				//Order displayed on last element
				if(displayed == Count){
					var sorted = $('.components-section .components-container .component-container').sort(function (a, b) {
					  var contentA = parseInt($(a).attr('data-index'));
					  var contentB = parseInt($(b).attr('data-index'));
					  return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
				   });
				   $(".components-section .components-container").empty();	
				   $(".components-section .components-container").append(sorted);

					//Bind expanders
					$(".component-container").each(function(){
						$(this).on("click", function(){
							if($(this).hasClass("open")){
								$(this).removeClass("open");
								$(this).find("i.trigger").text("expand_more");
							}else{
								$(this).addClass("open");
								$(this).find("i.trigger").text("expand_less");
							}
						});
					});
					
					//statuses.up = 0;
					//statuses.difficulties = 5;
					//statuses.down = 5;

					//Process the summary
					if(statuses.up == services.length){
						$("h2.service-status").addClass("up");
						$("h2.service-status").prepend("Todos los servicios disponibles ");
						$("h2.service-status i").html("done_all");
					}else if(statuses.down == services.length){
						$("h2.service-status").addClass("down");
						$("h2.service-status").prepend("Servicios no disponibles ");
						$("h2.service-status i").html("clear");
					}else if(statuses.maintenance == services.length){
						$("h2.service-statusr").addClass("level");
						$("h2.service-status").prepend("Realizando tareas de mantenimiento ");
						$("h2.service-status i").html("flag");
					}else if(statuses.difficulties == services.length){
						$("h2.service-status").addClass("level");
						$("h2.service-status").prepend("Experimentando dificultades ");
						$("h2.service-status i").html("flag");
					}else{
						$("h2.service-status").addClass("none");
						$("h2.service-status").prepend("No se ha podido determinar ");
						$("h2.service-status i").html("flag");
					}
					
					//Process averages
					averages.daily = (parseFloat(averages.daily)/(services.length)).toFixed(2);
					averages.weekly = (parseFloat(averages.weekly)/(services.length)).toFixed(2);
					averages.monthly = (parseFloat(averages.monthly)/(services.length)).toFixed(2);
					averages.quarterly = (parseFloat(averages.quarterly)/(services.length)).toFixed(2);
					averages.alltime = (parseFloat(averages.alltime)/(services.length)).toFixed(2);
					
					var avgs = [averages.daily, averages.weekly, averages.monthly, averages.quarterly, averages.alltime];					
					var splits = CustomTime.split('-');
					var avghtml = '';
		
					for (i = 0; i < splits.length; i++) { 
						if (avgs[i] >= 99) {
							var avgratio = 'up';
						} else if (avgs[i] >= 90) {
							var avgratio = 'level';
						} else {
							var avgratio = 'down';
						}						
						avghtml += '<div class="col span_1_of_' + (splits.length) +'" style="opacity:' + (splits.length - i)/splits.length + '"><h4 class="boxed noborder ' + avgratio + '">' + avgs[i] + '%</h4><h5>' + TimeTags[i] + '</h5></div>';
					}
					
					$("#maincontent .section").append(avghtml);
					
				}			


             });
		}
	});
	
}


var CustomTime = "1-7-30-90";

var TimeTags = [
	'ayer',
	'esta semana',
	'último mes',
	'pasado trimestre',
	'desde el inicio'
];

var Title = 'Nexus';

var statuses = { up: 0, down: 0, difficulties: 0, paused: 0, unchecked: 0}

var averages = { daily: 0.0, weekly: 0.0, monthly: 0.0, quarterly: 0.0, alltime: 0.0}

$( document ).ready(function() {
	console.log( "ready!" );
	
	moment.locale("es");
	
	Chart.defaults.global.legend.display = false;	
	Chart.defaults.global.defaultFontFamily = 'TeleGroteskScreen';
	Chart.defaults.global.animation.easing = 'easeInOutQuad';
	Chart.defaults.globaldefaultColor = "#f0f0f0";
	
	Chart.defaults.global.elements.point.radius = 4;
	Chart.defaults.global.elements.point.backgroundColor = "white";
	Chart.defaults.global.elements.point.borderWidth = 3;
	Chart.defaults.global.elements.point.borderColor = "#ddd";
	Chart.defaults.global.elements.point.hoverRadius = 6;
	Chart.defaults.global.elements.point.hoverBorderWidth = 12;
	
	Chart.defaults.global.elements.line.backgroundColor = "white";
	Chart.defaults.global.elements.line.borderWidth = 3;
	Chart.defaults.global.elements.line.borderColor = "#ddd";
	Chart.defaults.global.elements.line.borderJoinStyle = 'round';
	Chart.defaults.global.elements.line.fill = false;
	
	for (i = 0; i < services.length; i++) { 
		getService(i, services[i], services.length, CustomTime);
	}	
});
