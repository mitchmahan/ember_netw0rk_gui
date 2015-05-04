import DS from 'ember-data';

export default DS.Model.extend({
  router: DS.belongsTo('device'),
  name: DS.attr('string'),
  numroutes: DS.hasMany('numroute')
});
