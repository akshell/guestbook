// (c) 2011 by Anton Korenyushkin

require('ak').setup();


init = function () {
  rv.Entry.create(
    {
      id: 'unique serial',
      author: 'string',
      title: 'string',
      message: 'string'
    });
};


var IndexHandler = Handler.subclass(
  {
    get: function (request) {
      return render(
        'index.html', {entries: rv.Entry.all().get({by: '-id'})});
    },
    
    post: function (request) {
      if (!request.post.author ||
          !request.post.title ||
          !request.post.message)
        throw Failure('All fields are required');
      rv.Entry.insert(
        {
          author: request.post.author,
          title: request.post.title,
          message: request.post.message
        });
      return redirect('/');
    }
  });


var EntryHandler = Handler.subclass(
  {
    get: function (request, id) {
      return render(
        'entry.html', {entry: rv.Entry.where({id: id}).getOne()});
    }
  });


exports.root = new URLMap(
  IndexHandler, 'index',
  [/\d+/, EntryHandler, 'entry']);
