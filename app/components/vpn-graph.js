import Ember from 'ember';

export default Ember.Component.extend({

  graphData: function(){
    var data = this.get('data');
    var xy_data = [];
    data.forEach(function(vpn){
      xy_data.push(vpn.get('numroutes').map(function(d){
        return { 'label': vpn.get('name'), 'x': d.get('time'), 'y': d.get('count') };
      }));
    });
    return xy_data;
  }.property(),

  didInsertElement: function() {
    graph = new window.Rickshaw.Graph();

    graph.render();
  }

});
