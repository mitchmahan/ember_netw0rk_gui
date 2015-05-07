import Ember from 'ember';

export default Ember.Controller.extend({
  numChanges: 0,
  changes: function() {
    return this.get('numChanges')
  }.property('numChanges'),

  cpuData: function(){
    var cpu_data = this.store.find('cpu', { 'date': '2015-5-5' });
    return cpu_data;
  }.property(),
  
  vpnData: function(){
   return  this.store.findAll('vpn');
  }.property()

});
