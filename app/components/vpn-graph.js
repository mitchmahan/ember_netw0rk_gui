import Ember from 'ember';

export default Ember.Component.extend({

  graphData: function(){
    var data = this.get('data');
    var xy_data = [];
    data.forEach(function(vpn){
      var new_vpn = { 'name': vpn.get('name'), color: '#'+Math.floor(Math.random()*16777215).toString(16) };
      new_vpn.data = (vpn.get('numroutes').map(function(d){
        return {'x': d.get('time'), 'y': d.get('count') };
      }));
      xy_data.push(new_vpn);
    });
    return xy_data;
  }.property(),

  didInsertElement: function() {

    var graph = new Rickshaw.Graph({
      element: document.querySelector('#' + this.elementId), 
      width: 960, 
      height: 500, 
      renderer: 'line',
      series: this.get('graphData')
    });

    graph.render();

    var hoverDetail = new Rickshaw.Graph.HoverDetail( {
          graph: graph
    } );


    var xAxis = new Rickshaw.Graph.Axis.Time({
        graph: graph,
        ticksTreatment: 'glow'
    });

    xAxis.render();

    var yAxis = new Rickshaw.Graph.Axis.Y({
        graph: graph,
        tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
        ticksFormat: 'glow'
    });

    yAxis.render();

    var legend = new Rickshaw.Graph.Legend( {
        graph: graph,
        element: document.getElementById(this.get('device') + '-legend')

    } );

    var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
        graph: graph,
          legend: legend
    } );

  }

});
