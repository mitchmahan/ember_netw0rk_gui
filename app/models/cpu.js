import DS from 'ember-data';

export default DS.Model.extend({
  router: DS.belongsTo('device'),
  utilization: DS.attr('number'),
  time: DS.attr('number')
});
