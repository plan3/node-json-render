# RenderJSON

Simple tool to render valid JSON from a valid JSON template

# Installation

```sh
$ npm install render-json
```

# Features

* Simple
* Use valid JSON as a template
* Use custom right and left delimiters (different or the same)
* Possibility to define common params once and overwrite on each render
* Use value if variable fills whole string:
    * template:
    
        ```javascript
        {
            person: '${personalData}'
        }
        ```
        
    * params:
    
        ```javascript
        {
            personalData: {
                name: 'John',
                age: 30,
                male: true
            }
        }
        ```
        
    * result:
    
        ```javascript
        {
            person: {
                name: 'John',
                age: 30,
                male: true
            }
        }
        ```
        
* Stringify values if inside string
    * template:
    
        ```javascript
        {
            person: 'Personal data: ${personalData}'
        }
        ```
        
    * params:
    
        ```javascript
        {
            personalData: {
                name: 'John',
                age: 30,
                male: true
            }
        }
        ```
        
    * result:
    
        ```javascript
        {
            person: 'Personal data: {"name":"John","age":30,"male":true}'
        }
        ```

# Examples

* [Basic](examples/basic)
* [One time](examples/one-time)
* [Custom delimiters](examples/custom-delimiters)


# Tests

```sh
$ npm test
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
