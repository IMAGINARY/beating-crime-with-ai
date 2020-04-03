
// Add the restart button
$('<button>')
  .attr('type', 'button')
  .addClass('restart-button')
  .text('Neustart')
  .on('click', () => {
    SugarCube.UI.restart();
  })
  .appendTo('body');
