import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  updated_at: DS.attr('date'),
  vpns: DS.hasMany('vpn'),
  cpus: DS.hasMany('cpu'),
  memorys: DS.hasMany('memory')
});
