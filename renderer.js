// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const _ = require('lodash');
const marked = require('marked');
const fs = require('fs')

new Vue({
  el: '#editor',
  data: {
    file: '',
    input: 'To open a file drag and drop it on the application.'
  },
  created () {

    document.ondragover = document.ondrop = (ev) => {
      ev.preventDefault()
    }

    document.body.ondrop = (ev) => {
      this.file = ev.dataTransfer.files[0].path;
      this.input = fs.readFileSync(this.file).toString();
      ev.preventDefault()
    }

  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input, { sanitize: true })
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value;
      fs.writeFileSync(this.file, this.input);
    }, 300)
  }
})
