//import iobiocmd from '../third-party/iobio.js'
import { Client } from 'iobio-api-client';


export default class EndpointCmd {

  constructor(globalApp, launchTimestamp, genomeBuildHelper, getHumanRefNamesFunc) {
    this.globalApp         = globalApp;
    this.launchTimestamp   = launchTimestamp;
    this.genomeBuildHelper = genomeBuildHelper;
    this.getHumanRefNames  = getHumanRefNamesFunc;
    this.launchedFromUtah =  this.globalApp.IOBIO_SERVICES.indexOf('mosaic.chpc.utah.edu') == 0;
    this.api = new Client('backend.iobio.io', { secure: true });
    //this.api = new Api('localhost:9001', { secure: false });

    // iobio services
    //this.IOBIO = {};
    //this.IOBIO.tabix                   = this.globalApp.IOBIO_SERVICES  + (this.globalApp.useOnDemand ? "od_tabix/" : "tabix/");
    //this.IOBIO.vcfReadDepther          = this.globalApp.IOBIO_SERVICES  + "vcfdepther/";
    //this.IOBIO.snpEff                  = this.globalApp.IOBIO_SERVICES  + "snpeff/";
    //this.IOBIO.vt                      = this.globalApp.IOBIO_SERVICES  + "vt/";
    //this.IOBIO.af                      = this.globalApp.IOBIO_SERVICES  + "af/";
    //this.IOBIO.vep                     = (this.launchedFromUtah === true ? this.globalApp.IOBIO_SERVICES : this.globalApp.GREEN_IOBIO) + "vep/";   // Inside utah mosaic, normal services, else beefy nv-green to accommodate sfari
    //this.IOBIO.contigAppender          = this.globalApp.IOBIO_SERVICES  + "ctgapndr/";
    //this.IOBIO.bcftools                = this.globalApp.IOBIO_SERVICES  + "bcftools/";
    //this.IOBIO.coverage                = this.globalApp.IOBIO_SERVICES  + "coverage/";
    //this.IOBIO.samtools                = this.globalApp.IOBIO_SERVICES  +  "samtools/";
    //this.IOBIO.samtoolsOnDemand        = this.globalApp.IOBIO_SERVICES  + (this.globalApp.useOnDemand ? "od_samtools/" : "samtools/");
    //this.IOBIO.freebayes               = this.globalApp.IOBIO_SERVICES  + "freebayes/";
    //this.IOBIO.vcflib                  = this.globalApp.IOBIO_SERVICES  + "vcflib/";
    //this.IOBIO.geneCoverage            = this.globalApp.IOBIO_SERVICES  + "genecoverage/";
    //this.IOBIO.knownvariants           = this.globalApp.IOBIO_SERVICES  + "knownvariants/";
  }



  getVcfHeader(vcfUrl, tbiUrl) {
    return this.api.variantHeader(vcfUrl);
  }

  getVcfDepth(vcfUrl, tbiUrl) {
    if (!tbiUrl) {
      tbiUrl = vcfUrl + '.tbi';
    }
    return this.api.vcfReadDepth(tbiUrl);
  }

  annotateVariants(vcfSource, refName, regions, vcfSampleNames, annotationEngine, isRefSeq, hgvsNotation, getRsId, vepAF, useServerCache, serverCacheKey, sfariMode = false) {
    //var me = this;

    //// Figure out the file location of the reference seq files
    //var regionParm = "";
    //if (regions && regions.length > 0) {
    //  regions.forEach(function(region) {
    //    if (regionParm.length > 0) {
    //      regionParm += " ";
    //    }
    //    regionParm += region.name + ":" + region.start + "-" + region.end;
    //  })
    //}

    //var contigStr = "";
    //me.getHumanRefNames(refName).split(" ").forEach(function(ref) {
    //    contigStr += "##contig=<ID=" + ref + ">\n";
    //})
    //var contigNameFile = new Blob([contigStr])


    //// Create an iobio command get get the variants and add any header recs.
    //var args = [];
    //var cmd = null;
    //if (vcfSource.hasOwnProperty('vcfUrl')) {
    //  //  If we have a vcf URL, use tabix to get the variants for the region
    //  var args = ['-h', '"'+vcfSource.vcfUrl+'"', regionParm];
    //  if (vcfSource.tbiUrl) {
    //    args.push('"'+vcfSource.tbiUrl+'"');
    //  }

    //  cmd = new iobio.cmd(me.IOBIO.tabix, args, {ssl: me.globalApp.useSSL})
    //      .pipe(me.IOBIO.bcftools, ['annotate', '-h', contigNameFile, '-'], {ssl: me.globalApp.useSSL})

    //} else if (vcfSource.hasOwnProperty('writeStream')) {
    //  // If we have a local vcf file, use the writeStream function to stream in the vcf records
    //  cmd = new iobio.cmd(me.IOBIO.bcftools, ['annotate', '-h', contigNameFile, vcfSource.writeStream], {ssl: me.globalApp.useSSL})
    //} else {
    //  console.log("EndpointCmd.annotateVariants() vcfSource arg is not invalid.");
    //  return null;
    //}

    //if (vcfSampleNames && vcfSampleNames.length > 0) {
    //  var sampleNameFile = new Blob([vcfSampleNames.split(",").join("\n")])
    //  cmd = cmd.pipe(me.IOBIO.vt, ["subset", "-s", sampleNameFile, '-'], {ssl: me.globalApp.useSSL})
    //}

    //// normalize variants

    //var refFastaFile = me.genomeBuildHelper.getFastaPath(refName);
    //cmd = cmd.pipe(me.IOBIO.vt, ["normalize", "-n", "-r", refFastaFile, '-'], {ssl: me.globalApp.useSSL});

    //// if af not retreived from vep, get allele frequencies from 1000G and ExAC in af service
    ////cmd = cmd.pipe(me.IOBIO.af, ["-b", me.genomeBuildHelper.getCurrentBuildName()], {ssl: me.globalApp.useSSL});

    //// Skip snpEff if RefSeq transcript set or we are just annotating with the vep engine
    //if (annotationEngine == 'none') {
    //  // skip annotation if annotationEngine set to  'none'

    //} else if (isRefSeq || annotationEngine == 'vep') {
    //  // VEP
    //  var vepArgs = [];
    //  vepArgs.push(" --assembly");
    //  vepArgs.push(me.genomeBuildHelper.getCurrentBuildName());
    //  vepArgs.push(" --format vcf");
    //  vepArgs.push(" --allele_number");
    //  if (me.globalApp.vepREVELFile) {
    //    vepArgs.push(" --plugin REVEL," + me.globalApp.vepREVELFile);
    //  }
    //  if (vepAF) {
    //    vepArgs.push("--af");
    //    vepArgs.push("--af_gnomad");
    //    vepArgs.push("--af_esp");
    //    vepArgs.push("--af_1kg");
    //    vepArgs.push("--max_af");
    //  }
    //  if (isRefSeq) {
    //    vepArgs.push("--refseq");
    //  }
    //  // Get the hgvs notation and the rsid since we won't be able to easily get it one demand
    //  // since we won't have the original vcf records as input
    //  if (hgvsNotation) {
    //    vepArgs.push("--hgvs");
    //  }
    //  if (getRsId) {
    //    vepArgs.push("--check_existing");
    //  }
    //  if (hgvsNotation || me.globalApp.utility.getRsId || isRefSeq) {
    //    vepArgs.push("--fasta");
    //    vepArgs.push(refFastaFile);
    //  }

    //  //
    //  //  SERVER SIDE CACHING
    //  //
    //  var cacheKey = null;
    //  var urlParameters = {};
    //  if (useServerCache && serverCacheKey.length > 0) {
    //      urlParameters.cache = serverCacheKey;
    //      urlParameters.partialCache = true;
    //      cmd = cmd.pipe("nv-dev-new.iobio.io/vep/", vepArgs, {ssl: me.globalApp.useSSL, urlparams: urlParameters});
    //  } else {
    //      cmd = cmd.pipe(me.IOBIO.vep, vepArgs, {ssl: me.globalApp.useSSL, urlparams: urlParameters});
    //  }

    //} else if (annotationEngine == 'snpeff') {
    //    cmd = cmd.pipe(me.IOBIO.snpEff, [], {ssl: me.globalApp.useSSL});
    //}

    //if (sfariMode === true) {
    //    cmd = cmd.pipe(me.IOBIO.bcftools, ['view', '-G', '-'], {ssl: me.globalApp.useSSL});
    //}


    //return cmd;

    const refNames = this.getHumanRefNames(refName).split(" ");
    const genomeBuildName = this.genomeBuildHelper.getCurrentBuildName();
    const refFastaFile = this.genomeBuildHelper.getFastaPath(refName);

    const ncmd = this.api.annotateVariants({
      vcfUrl: vcfSource.vcfUrl,
      tbiUrl: vcfSource.tbiUrl,
      refNames,
      regions,
      vcfSampleNames: vcfSampleNames.split(','),
      refFastaFile,
      genomeBuildName,

      isRefSeq,
      hgvsNotation,
      getRsId,
      vepAF,
      sfariMode,

      vepREVELFile: this.globalApp.vepREVELFile,
      //globalGetRsId: me.globalApp.utility.getRsId,
    });

    return ncmd;

  }

  normalizeVariants(vcfUrl, tbiUrl, refName, regions) {

    var me = this;

    var refFastaFile = me.genomeBuildHelper.getFastaPath(refName);

    //var regionParm = "";
    //regions.forEach(function(region) {
    //  if (regionParm.length > 0) {
    //    regionParm += " ";
    //  }
    //  regionParm += region.refName + ":" + region.start + "-" + region.end;
    //})

    //var args = ['-h', vcfUrl, regionParm];
    //if (tbiUrl) {
    //  args.push(tbiUrl);
    //}

    var contigStr = "";
    me.getHumanRefNames(refName).split(" ").forEach(function(ref) {
        contigStr += "##contig=<ID=" + ref + ">\n";
    })
    //var contigNameFile = new Blob([contigStr])

    //var cmd = new iobio.cmd(me.IOBIO.tabix, args, {ssl: me.globalApp.useSSL})
    //                   .pipe(me.IOBIO.bcftools, ['annotate', '-h', contigNameFile, '-'], {ssl: me.globalApp.useSSL})

    // normalize variants
    //cmd = cmd.pipe(me.IOBIO.vt, ["normalize", "-n", "-r", refFastaFile, '-'], {ssl: me.globalApp.useSSL})

    const cmd = this.api.normalizeVariants(vcfUrl, tbiUrl, refName, regions, contigStr, refFastaFile);
    return cmd;
  }

  //getClinvarCountsForGene(clinvarUrl, refName, geneObject, binLength, regions) {
  //  var me = this;
  //  var regionParm = refName + ":" + geneObject.start + "-" + geneObject.end;

  //  // For the knownVariants service, pass in an argument for the gene region, then pass in eith
  //  // the length of the bin region or a comma separate string of region parts (e.g. the exons)
  //  var knownVariantsArgs = [];
  //  knownVariantsArgs.push("-r");
  //  knownVariantsArgs.push(regionParm);
  //  if (binLength) {
  //    knownVariantsArgs.push("-b");
  //    knownVariantsArgs.push(binLength);
  //  } else if (regions) {
  //    var regionParts = "";
  //    regions.forEach( function(region) {
  //      if (regionParts.length > 0) {
  //        regionParts += ",";
  //      }
  //      regionParts += region.start + "-" + region.end;
  //    })
  //    if (regionParts.length > 0) {
  //      knownVariantsArgs.push("-p");
  //      knownVariantsArgs.push(regionParts);
  //    }
  //  }
  //  knownVariantsArgs.push("-");


  //  // Create an iobio command get get the variants and add any header recs.
  //  var tabixArgs = ['-h', clinvarUrl, regionParm];

  //  var cmd = new iobio.cmd (me.IOBIO.tabix,         tabixArgs,         {ssl: me.globalApp.useSSL})
  //                     .pipe(me.IOBIO.knownvariants, knownVariantsArgs, {ssl: me.globalApp.useSSL});

  //  return cmd;
  //}

  getBamHeader(bamUrl, baiUrl) {
    return this.api.alignmentHeader(bamUrl);
  }

  getBamCoverage(bamSource, refName, regionStart, regionEnd, regions, maxPoints, useServerCache, serverCacheKey) {

    const url = bamSource.bamUrl;
    const samtoolsRegion = { refName, start: regionStart, end: regionEnd };
    const indexUrl = bamSource.baiUrl;
    maxPoints = maxPoints ? maxPoints : 0;
    const coverageRegions = regions;

    return this.api.alignmentCoverage(url, indexUrl, samtoolsRegion, maxPoints, coverageRegions);
  }

  //freebayesJointCall(bamSources, refName, regionStart, regionEnd, isRefSeq, fbArgs, vepAF) {
  //  var me = this;

  //  var regionArg =  refName + ":" + regionStart + "-" + regionEnd;

  //  var bamCmds = me._getBamRegions(bamSources, refName, regionStart, regionEnd);

  //  var refFastaFile = me.genomeBuildHelper.getFastaPath(refName);

  //  var freebayesArgs = [];
  //  bamCmds.forEach( function(bamCmd) {
  //    freebayesArgs.push("-b");
  //    freebayesArgs.push(bamCmd);
  //  });

  //  freebayesArgs.push("-f");
  //  freebayesArgs.push(refFastaFile);

  //  if (fbArgs && fbArgs.useSuggestedVariants.value == true) {
  //    freebayesArgs.push("-@");
  //    freebayesArgs.push(me._getSuggestedVariants(refName, regionStart, regionEnd));
  //  }
  //  if (fbArgs) {
  //    for (var key in fbArgs) {
  //      var theArg = fbArgs[key];
  //      if (theArg.hasOwnProperty('argName')) {
  //        if (theArg.hasOwnProperty('isFlag') && theArg.isFlag == true) {
  //          if (theArg.value && theArg.value == true) {
  //              freebayesArgs.push(theArg.argName);
  //          }
  //        } else {
  //          if (theArg.value && theArg.value != '') {
  //            freebayesArgs.push(theArg.argName);
  //            freebayesArgs.push(theArg.value);
  //          }
  //        }

  //      }
  //    }

  //  }


  //  var cmd = new iobio.cmd(me.IOBIO.freebayes, freebayesArgs, {ssl: me.globalApp.useSSL});


  //  // Normalize variants
  //  cmd = cmd.pipe(me.IOBIO.vt, ['normalize', '-r', refFastaFile, '-'], {ssl: me.globalApp.useSSL});

  //  // Subset on all samples (this will get rid of low quality cases where no sample
  //  // is actually called as having the alt)
  //  //cmd = cmd.pipe(IOBIO.vt, ['subset', '-s', '-']);

  //  // Filter out anything with qual <= 0
  //  cmd = cmd.pipe(me.IOBIO.vt, ['filter', '-f', "\'QUAL>1\'", '-t', '\"PASS\"', '-d', '\"Variants called by iobio\"', '-'], {ssl: me.globalApp.useSSL});


  //  //
  //  // Annotate variants that were just called from freebayes
  //  //

  //  // bcftools to append header rec for contig
  //  var contigStr = "";
  //  me.getHumanRefNames(refName).split(" ").forEach(function(ref) {
  //      contigStr += "##contig=<ID=" + ref + ">\n";
  //  })
  //  var contigNameFile = new Blob([contigStr])
  //  cmd = cmd.pipe(me.IOBIO.bcftools, ['annotate', '-h', contigNameFile], {ssl: me.globalApp.useSSL})

  //  // Get Allele Frequencies from 1000G and ExAC
  //  cmd = cmd.pipe(me.IOBIO.af, [], {ssl: me.globalApp.useSSL})

  //  // VEP to annotate
  //  var vepArgs = [];
  //  vepArgs.push(" --assembly");
  //  vepArgs.push(me.genomeBuildHelper.getCurrentBuildName());
  //  vepArgs.push(" --format vcf");
  //  vepArgs.push(" --allele_number");
  //  if (me.globalApp.vepREVELFile) {
  //    vepArgs.push(" --plugin REVEL," + me.globalApp.vepREVELFile);
  //  }
  //  if (vepAF) {
  //    vepArgs.push("--af");
  //    vepArgs.push("--af_gnomad");
  //    vepArgs.push("--af_esp");
  //    vepArgs.push("--af_1kg");
  //    vepArgs.push("--max_af");
  //  }

  //  if (isRefSeq) {
  //    vepArgs.push("--refseq");
  //  }
  //  // Get the hgvs notation and the rsid since we won't be able to easily get it one demand
  //  // since we won't have the original vcf records as input
  //  vepArgs.push("--hgvs");
  //  vepArgs.push("--check_existing");
  //  vepArgs.push("--fasta");
  //  vepArgs.push(refFastaFile);
  //  cmd = cmd.pipe(me.IOBIO.vep, vepArgs, {ssl: me.globalApp.useSSL});

  //  return cmd;
  //}


  getGeneCoverage(bamSources, refName, geneName, regionStart, regionEnd, regions) {

    const url = bamSources[0].bamUrl;
    const indexUrl = bamSources[0].baiUrl;

    const ncmd = this.api.geneCoverage(url, indexUrl, refName, geneName, regionStart, regionEnd, regions);
    return ncmd;
    //ncmd.on('data', (data) => {
    //  console.log("data");
    //  console.log(data);
    //});
    //ncmd.on('end', () => {
    //});
    //ncmd.run();


    //var me = this;
    //var bamCmds = me._getBamRegions(bamSources, refName, regionStart, regionEnd);

    //var args = [];

    //bamCmds.forEach( function(bamCmd) {
    //  args.push("-b");
    //  args.push(bamCmd);
    //});

    //var regionStr = "#" + geneName + "\n";
    //regions.forEach(function(region) {
    //  regionStr += refName + ":" + region.start + "-" + region.end + "\n";
    //})
    //console.log("regionStr", regionStr);
    //console.log("regions", regions);

    //var regionFile = new Blob([regionStr])

    //args.push("-r");
    //args.push(regionFile);


    //var cmd = new iobio.cmd(me.IOBIO.geneCoverage, args, {ssl: me.globalApp.useSSL});
    ////cmd.on('data', (data) => {
    ////  console.log("working one");
    ////  console.log(data);
    ////});
    //return cmd;


  }

  //_getBamRegions(bamSources, refName, regionStart, regionEnd) {
  //  var me = this;

  //  var regionArg =  refName + ":" + regionStart + "-" + regionEnd;


  //  var bamCmds = [];
  //  bamSources.forEach(function(bamSource) {
  //    var samtools = bamSource.bamUrl != null ?  me.IOBIO.samtoolsOnDemand : me.IOBIO.samtools;

  //    if (bamSource.bamUrl ) {
  //      var args = ['view', '-b', '"'+bamSource.bamUrl+'"', regionArg];
  //      if (bamSource.baiUrl) {
  //        args.push('"'+bamSource.baiUrl+'"');
  //      }
  //      var bamCmd = new iobio.cmd(samtools, args, {'urlparams': {'encoding':'binary'}, ssl: me.globalApp.useSSL});
  //      bamCmds.push(bamCmd);

  //    } else {
  //      var args = ['view', '-b', bamSource.bamBlob];
  //      var bamCmd = new iobio.cmd(samtools, args, {'urlparams': {'encoding':'binary'}, ssl: me.globalApp.useSSL});
  //      bamCmds.push(bamCmd);
  //    }

  //  })
  //  return bamCmds;
  //}

  //_getSuggestedVariants(refName, regionStart, regionEnd) {
  //  var me = this;

  //  // Create an iobio command get get the variants from clinvar for the region of the gene
  //  var regionParm = refName + ":" + regionStart + "-" + regionEnd;

  //  //var clinvarUrl = me.genomeBuildHelper.getBuildResource(me.genomeBuildHelper.RESOURCE_CLINVAR_VCF_FTP);
  //  var clinvarUrl  = me.globalApp.getClinvarUrl(me.genomeBuildHelper.getCurrentBuildName());

  //  var tabixArgs = ['-h', clinvarUrl, regionParm];
  //  var cmd = new iobio.cmd (me.IOBIO.tabix, tabixArgs, {ssl: me.globalApp.useSSL});

  //  cmd = cmd.pipe(me.IOBIO.vt, ['view', '-f', '\"INFO.CLNSIG=~\'5|4\'\"', '-'], {ssl: me.globalApp.useSSL});


  //  return cmd;
  //}

}


