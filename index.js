/**
 * Created by yuansc on 10/22/14.
 */
'use strict';

var gift = require('gift');
var Reboot = module.exports;
var cp = require('child_process');
var async = require('async');
/**
 * config this module
 * @param options
 * @param callback
 */
Reboot.config = function(options) {
  if(!options.main) throw new Error('main is needed');
  options.method = options.method || 'forever';
  options.branch = options.branch || 'master';
  options.dir = options.dir || './';
  options.main = options.main;
  Reboot.options =options;
  gift.init(options.dir, function (err, repo) {
    if(err) {
      throw new Error('git repo init failed');
    }
    console.log(options);
    Reboot.repo = repo;
    Reboot._hook();
  });
};

Reboot._checkout = function checkout(callback){
  Reboot.repo.checkoutFile({force: true},function (err, result) {
    if(err) {
      throw new Error('checkout failed');
    }
    callback();
  });
};

Reboot._sync = function (callback) {
  Reboot.repo.sync('origin',  Reboot.options.branch, function (err, result){
    if(err) {
      throw new Error(err);
    }
    callback();
  });
};

Reboot._reboot = function () {
  cp.exec(Reboot.options.method + ' restart ' + Reboot.options.main, function (err, stdout, stderr) {
    if(err || stderr) {
      throw new Error(err || stderr);
    }
  });
};

Reboot._hook= function () {
  async.series({
    checkout: this._checkout,
    sync:this._sync,
    reboot:this._reboot
  })
};
