import DS from 'ember-data';

export default DS.Model.extend({
  vpn: DS.belongsTo('vpn'),
  time: DS.attr('number'),
  count: DS.attr('number')
});
