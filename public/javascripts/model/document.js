dc.model.Document = dc.Model.extend({
  
  WEB_URL : (/^https?:/),

  constructor : function(attributes) {
    this.base(attributes);
    this.s3 = !!this.get('pdf').match(this.WEB_URL);
  },
  
  // Return a list of the document's metadata. Think about caching this on the
  // document by binding to Metadata, instead of on-the-fly.
  metadata : function() {
    var docId = this.id;
    return _.select(Metadata.values(), function(m) {
      return _.any(m.get('instances'), function(i){ 
        return i.document_id == docId; 
      });
    });
  },
  
  thumbnailURL : function() {
    return this.s3 ? this.get('thumbnail') : '/documents/thumbnail/' + this.id;
  },
  
  pdfURL : function() {
    return this.s3 ? this.get('pdf') : '/documents/' + this.id + '.pdf';
  },
  
  textURL : function() {
    return '/documents/' + this.id + '.txt';
  },
  
  // Inspect.
  toString : function() {
    return 'Document ' + this.id + ' "' + this.get('title') + '"';
  }
  
});