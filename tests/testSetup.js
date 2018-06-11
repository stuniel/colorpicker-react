const { configure } = require('enzyme')
const EnzymeAdapter = require('enzyme-adapter-react-16')
const { createSerializer } = require('enzyme-to-json')

configure({ adapter: new EnzymeAdapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))
