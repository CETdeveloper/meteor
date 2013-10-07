Tinytest.add("rexpr - examples", function (test) {

  test.equal(RExpr.parse('a+b'),
             { t: RExpr.INFIX_OPERATOR, // type
               s: '+', // symbol
               // operands
               o: [{ t: RExpr.REFERENCE, // type
                     n: 'a' }, // name
                   { t: RExpr.REFERENCE,
                     n: 'b' }]
             });

  test.equal(RExpr.parse('(a+b)'),
             { t: RExpr.BRACKETED,
               // eXpression
               x: { t: RExpr.INFIX_OPERATOR, // type
                    s: '+', // symbol
                    // operands
                    o: [{ t: RExpr.REFERENCE, // type
                          n: 'a' }, // name
                        { t: RExpr.REFERENCE,
                          n: 'b' }]
                  }
             });

  test.equal(RExpr.parse('[0,1,2]'),
             { t: RExpr.ARRAY_LITERAL,
               // members
               m: [{t: RExpr.NUMBER_LITERAL,
                    v: "0"}, // value
                   {t: RExpr.NUMBER_LITERAL,
                    v: "1"},
                   {t: RExpr.NUMBER_LITERAL,
                    v: "2"}]
             });

  test.equal(RExpr.parse('Math.random()'),
             { t: RExpr.INVOCATION,
               x: { t: RExpr.MEMBER,
                    x: { t: RExpr.GLOBAL,
                         v: 'Math' },
                    // refinement (thing after the dot in a member access)
                    r: { t: RExpr.REFINEMENT,
                         n: 'random' }
                  }
             });

  test.equal(RExpr.parse('f(x)'),
             { t: RExpr.INVOCATION,
               x: { t: RExpr.REFERENCE,
                    n: 'f' },
               // operands (arguments)
               o: [{ t: RExpr.REFERENCE,
                     n: 'x' }]
             });

  test.equal(RExpr.parse('{foo: "bar"}'),
             { t: RExpr.OBJECT_LITERAL,
               m: [{ t: RExpr.KEY_VALUE_PAIR,
                     k: 'foo',
                     v: { t: RExpr.STRING_LITERAL,
                          v: 'bar' }
                   }]
             });

  test.equal(RExpr.parse('aaa ? bbb : ccc'),
             { t: RExpr.CONDITIONAL,
               // operands
               o: [{ t: RExpr.REFERENCE,
                     n: 'aaa' },
                   { t: RExpr.REFERENCE,
                     n: 'bbb' },
                   { t: RExpr.REFERENCE,
                     n: 'ccc' }]
             });

  test.equal(RExpr.parse('A + B * C'),
             { t: RExpr.INFIX_OPERATOR,
               s: '+',
               o: [{ t: RExpr.REFERENCE,
                     n: 'A' },
                   { t: RExpr.INFIX_OPERATOR,
                     s: '*',
                     o: [{ t: RExpr.REFERENCE,
                           n: 'B' },
                         { t: RExpr.REFERENCE,
                           n: 'C' }] }]
             });

  // XXX fails because order-of-operations code in parser is broken!
  test.equal(RExpr.parse('A * B + C'),
             { t: RExpr.INFIX_OPERATOR,
               s: '+',
               o: [{ t: RExpr.INFIX_OPERATOR,
                     s: '*',
                     o: [{ t: RExpr.REFERENCE,
                           n: 'A' },
                         { t: RExpr.REFERENCE,
                           n: 'B' }] },
                   { t: RExpr.REFERENCE,
                     n: 'C' }]
             });

  // XXX fails because order-of-operations code in parser is broken!
  test.equal(RExpr.parse('A === B || C < D && ! E'),
             { t: RExpr.INFIX_OPERATOR,
               s: '||',
               o: [{ t: RExpr.INFIX_OPERATOR,
                     s: '===',
                     o: [{ t: RExpr.REFERENCE,
                           n: 'A' },
                         { t: RExpr.REFERENCE,
                           n: 'B' }] },
                   { t: RExpr.INFIX_OPERATOR,
                     s: '&&',
                     o: [{ t: RExpr.INFIX_OPERATOR,
                           s: '<',
                           o: [{ t: RExpr.REFERENCE,
                                 n: 'C' },
                               { t: RExpr.REFERENCE,
                                 n: 'D' }] },
                         { t: RExpr.PREFIX_OPERATOR,
                           s: '!',
                           o: { t: RExpr.REFERENCE,
                                n: 'E' } }] }]
             });

});