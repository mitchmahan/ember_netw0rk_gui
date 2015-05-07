import Ember from 'ember';

export default Ember.Component.extend({
  logScale: d3.scale.log().domain([1, 10000]),

  graphData: function(){
    var _this = this;
    var data = this.get('data');
    var numChanges = this.get('numChanges');
    console.log(numChanges);
    var xy_data = [];
    var palette = new Rickshaw.Color.Palette( { scheme: 'spectrum2001' } );

    data.forEach(function(vpn){
      var max_min = vpn.get('numroutes').reduce(function(r, v){ 
        return { min: Math.min(r.min, v.get('count')), max: Math.max(r.max, v.get('count')) }
        console.log(changes);
      }, { min: Infinity, max: -Infinity }); 
      var changes = max_min.max - max_min.min;
      if( changes > numChanges ) {
        var new_vpn = { 
          name: vpn.get('name'), 
          color: palette.color(),
          scale: _this.get('logScale')
        };
        new_vpn.data = (vpn.get('numroutes').map(function(d){
          return {'x': d.get('time'), 'y': d.get('count') };
        }));
        xy_data.push(new_vpn);
      }
    });
    return xy_data;
  }.property('numChanges'),

  actions: {
    render: function() {
      var _this = this;
      var graph = new Rickshaw.Graph({
        element: document.querySelector('#' + this.elementId), 
        width: 1000, 
        height: 700, 
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

      var yAxis = new Rickshaw.Graph.Axis.Y.Scaled({
        graph: graph,
        tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
        ticksFormat: 'glow',
        scale: _this.get('logScale'),
      });

      yAxis.render();

      var legend = new Rickshaw.Graph.Legend( {
        graph: graph,
        element: document.getElementById(this.get('device.name') + '-vpn-legend')

      } );

      var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
        graph: graph,
        legend: legend
      } );

    }
  }

});
