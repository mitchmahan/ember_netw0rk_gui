import Ember from 'ember';

export default Ember.Component.extend({

  graphData: function(){
    var cpu_xy = this.get('data').map(function(d){
      return {'x': d.get('time'), 'y': d.get('utilization') };
    });
    return cpu_xy;
  }.property(),

  didInsertElement: function() {

    var graph = new Rickshaw.Graph({
      element: document.querySelector('#' + this.elementId), 
      width: 960, 
      height: 500, 
      renderer: 'line',
      series: [ {
        name: 'cpu',
        color: '#'+Math.floor(Math.random()*16777215).toString(16),
        data: this.get('graphData')
      } ]
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

  }

});
