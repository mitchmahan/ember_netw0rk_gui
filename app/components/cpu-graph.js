import Ember from 'ember';

export default Ember.Component.extend({

  graphData: function(){
    var cpu_xy = this.get('data').map(function(d){
      return {'x': d.get('time'), 'y': d.get('utilization') };
    });
    return cpu_xy;
  }.property(),

  actions: {
    render: function() {
      var graph = new Rickshaw.Graph({
        element: document.querySelector('#' + this.elementId), 
        max: 100,
        width: 550, 
        height: 300, 
        renderer: 'area',
        series: [ {
          name: 'cpu',
          color: "#830fa6",
          data: this.get('graphData'),
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

  }

});
