const tokenize = require('glsl-tokenizer')
const str = require('glsl-token-string')
const functions = require('./')
const test = require('tape')
const path = require('path')
const fs = require('fs')

test('glsl-token-functions', function (t) {
  const fixture = fs.readFileSync(path.join(__dirname, 'fixture.glsl'), 'utf8')
  const tokens = tokenize(fixture)
  const fns = functions(tokens)

  const names = fns.map(function (d) { return d.name })
  const types = fns.map(function (d) { return d.type })
  const args = fns.map(function (d) {
    return str(tokens.slice(d.args[0], d.args[1]))
  })

  t.equal(fns.length, 31, 'discovered 30 functions')
  t.deepEqual(names, [
    'noop',
    'doModel',
    'doModel',
    'calcRayIntersection_2_0',
    'calcRayIntersection_2_0',
    'calcNormal_4_1',
    'calcNormal_4_1',
    'texcube',
    'orenNayarDiffuse_3_2',
    'gaussianSpecular_5_3',
    'mod289_1_4',
    'mod289_1_4',
    'permute_1_5',
    'permute_1_5',
    'taylorInvSqrt_1_6',
    'taylorInvSqrt_1_6',
    'grad4_1_7',
    'snoise_1_8',
    'fogFactorExp2_6_10',
    'mod289',
    'mod289',
    'permute',
    'taylorInvSqrt',
    'snoise3',
    'path',
    'sU',
    'smin',
    'doModel',
    'attenuate',
    'mainImage',
    'precisionPrefix'
  ], 'all functions are in order of appearance with the correct name')

  t.deepEqual(types, [
    'Unused',
    'vec2',
    'Unused',
    'vec2',
    'vec2',
    'vec3',
    'vec3',
    'vec4',
    'float',
    'float',
    'vec4',
    'float',
    'vec4',
    'float',
    'vec4',
    'float',
    'vec4',
    'float',
    'float',
    'vec3',
    'vec4',
    'vec4',
    'vec4',
    'float',
    'vec2',
    'vec2',
    'float',
    'vec2',
    'float',
    'void',
    'float'
  ], 'all functions have the appropriate return type listed')

  t.deepEqual(args, [
    '()',
    '(vec3 p, vec2 beats)',
    '(Unused regular, vec3 ro)',
    '(vec3 rayOrigin, vec3 rayDir, float maxd, float precis, vec2 beats)',
    '(vec3 rayOrigin, vec3 rayDir, vec2 beats)',
    '(vec3 pos, float eps, vec2 beats)',
    '(vec3 pos, vec2 beats)',
    '( sampler2D sam, in vec3 p, in vec3 n )',
    '(\n  vec3 lightDirection,\n  vec3 viewDirection,\n  vec3 surfaceNormal,\n  float roughness,\n  float albedo)',
    '(\n  vec3 lightDirection,\n  vec3 viewDirection,\n  vec3 surfaceNormal,\n  float shininess)',
    '(vec4 x)',
    '(float x)',
    '(vec4 x)',
    '(float x)',
    '(vec4 r)',
    '(float r)',
    '(float j, vec4 ip)',
    '(vec4 v)',
    '(\n  const float dist,\n  const float density\n)',
    '(vec3 x)',
    '(vec4 x)',
    '(vec4 x)',
    '(vec4 r)',
    '(vec3 v)',
    '(float progress)',
    '(vec2 p1, vec2 p2)',
    '(float a, float b, float k)',
    '(vec3 p, vec2 beats)',
    '(float d)',
    '(out vec4 fragColor, in vec2 fragCoord)',
    '(float t)'
  ], 'all functions have the appropriate arguments listed')

  t.end()
})
