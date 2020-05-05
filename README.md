## EventBridge

```js
                                                  +----------------------------------+
                                                  |                                  |
                                         +------->+      atmConsumerCase1Fn          | source: custom.myATMapp
                                         |        |                                  | detail-type: transaction
               +-------------------+     |        +----------------------------------+ detail: location: - "prefix": "MA-"
               |                   |     |                                               
putEvents      |                   |     |        |                                  |
               +-------------------+     +------->+      atmConsumerCase2Fn          |
                                         |        |                                  |
                                         |        +----------------------------------+
                                         |
                                         |        +----------------------------------+
                                         |        |                                  |
                                         +------->+      atmConsumerCase3Fn          |
                                                  |                                  |
                                                  +----------------------------------+

```
