import DS from 'ember-data';

export default DS.Model.extend({
  vpn: DS.belongsTo('vpn'),
  time: DS.attr('date'),
  count: DS.attr('number')
});
