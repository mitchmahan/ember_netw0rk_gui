import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var devices = this.store.findAll('device');
    devices.get('cpu');
    return devices;
  }
});
