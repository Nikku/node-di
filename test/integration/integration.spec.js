var expect = require('chai').expect;

var annotate = require('../../').annotate;
var Injector = require('../../').Injector;
var Module = require('../../').Module;


describe('integration', function() {

  describe('bundle', function() {

    it('should expose API', function() {
      expect(annotate).to.exist;
      expect(Injector).to.exist;
      expect(Module).to.exist;
    });


    it('should work bundled', function() {

      class BubType {
        constructor() {
          this.name = 'bub';
        }
      }

      function BazType() {
        this.name = 'baz';
      }

      var module = {
        foo: [
          'factory',
          function() {
            return 'foo-value';
          }
        ],
        bar: ['value', 'bar-value'],
        baz: ['type', BazType],
        bub: ['type', BubType]
      };
      var injector = new Injector([module]);

      expect(injector.get('foo')).to.equal('foo-value');
      expect(injector.get('bar')).to.equal('bar-value');

      var bub = injector.get('bub');
      expect(bub).to.be.an.instanceof(BubType);
      expect(bub.name).to.eql('bub');

      var baz = injector.get('baz');
      expect(baz).to.be.an.instanceof(BazType);
      expect(baz.name).to.eql('baz');
    });

  });

});
