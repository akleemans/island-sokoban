import {LevelSet} from "./objects/level-set";
import {Level} from "./objects/level";

export class LevelService {

    public static solvedLevels = {};

    public static init() {
        LevelService.solvedLevels[LevelSet.set1] = [];
        LevelService.solvedLevels[LevelSet.set2] = [];
        LevelService.solvedLevels[LevelSet.set3] = [];
        LevelService.solvedLevels[LevelSet.set4] = [];
    }

    public static getMaxAvailableLevel(set: LevelSet): number {
        return Math.min(this.solvedLevels[set].length + 3, 24);
    }

    public static getSolvedLevels(set: LevelSet): number[] {
        return this.solvedLevels[set];
    }

    public static addSolvedLevel(set: LevelSet, level: number): void {
        if (this.solvedLevels[set].indexOf(level) === -1) {
            this.solvedLevels[set].push(level);
        }
    }

    static getLevelData(levelSet: LevelSet, nr: number): Level {

        /*
            # = Block/Wasser
              = Floor
            @ = Spieler
            + = Spieler auf Ziel
            $ = Kiste
            * = Kiste auf Ziel
            . = Ziel
            = = innerer Block

            Levels: http://www.onlinespiele-sammlung.de/sokoban/sokobangames/skinner/
        */

        const grid = this.levels[levelSet * 24 + nr];
        return new Level(LevelService.fillLevel(grid), levelSet, nr);
    }

    static fillLevel(level: string[]): string[] {
        let w = level[0].length;
        let h = level.length;

        if (w < 16) {
            let addBefore = Math.floor((16 - w) / 2);
            let addAfter = Math.ceil((16 - w) / 2);

            // add to beginning and end of every line
            for (let l = 0; l < h; l++) {
                for (let i = 0; i < addBefore; i++) {
                    level[l] = '#' + level[l];
                }
                for (let i = 0; i < addAfter; i++) {
                    level[l] = level[l] + '#';
                }

            }
        }

        // add lines
        let line = level[0];

        if (h < 12) {
            let addBefore = Math.floor((12 - h) / 2);
            let addAfter = Math.ceil((12 - h) / 2);

            // add to beginning and end of every line
            for (let l = 0; l < addBefore; l++) {
                level.unshift(line);
            }
            for (let l = 0; l < addAfter; l++) {
                level.push(line);
            }
        }

        console.log('filled level:', level);

        return level;
    }

    private static levels = {
        1: [
            '######',
            '# .###',
            '#  ###',
            '#*@  #',
            '#  $ #',
            '#  ###',
            '######'
        ],
        2: [
            '######',
            '#    #',
            '# =@ #',
            '# $* #',
            '# .* #',
            '#    #',
            '######',
        ],
        3: [
            '#########',
            '###  ####',
            '#     $ #',
            '# =  =$ #',
            '# . .=@ #',
            '#########',
        ],
        4: [
            '########',
            '#      #',
            '# .**$@#',
            '#      #',
            '#####  #',
            '########',
        ],
        5: [
            '########',
            '##     #',
            '## .$. #',
            '## $@$ #',
            '#  .$. #',
            '#      #',
            '########',
        ],
        6: [
            '############',
            '#    ###   #',
            '# $$     =@#',
            '# $ =...   #',
            '#   ########',
            '############',
        ],
        7: [
            '#######',
            '#     #',
            '# .$. #',
            '# $.$ #',
            '# .$. #',
            '# $.$ #',
            '#  @  #',
            '#######',
        ],
        8: [
            '########',
            '### ..@#',
            '### $$ #',
            '###= ###',
            '###= ###',
            '###= ###',
            '###= ###',
            '#    ###',
            '# =   ##',
            '#   = ##',
            '###   ##',
            '########',
        ],
        9: [
            '######',
            '#.  ##',
            '#@$$ #',
            '##   #',
            '###  #',
            '###=.#',
            '######',
        ],
        10: [
            '###########',
            '#######.  #',
            '#######.= #',
            '#######.= #',
            '# @ $ $ $ #',
            '# = = = =##',
            '#       =##',
            '###########',
        ],
        11: [
            '#########',
            '###    ##',
            '### ==@##',
            '### = $ #',
            '# ..= $ #',
            '#       #',
            '#  ######',
            '#########',
        ],
        12: [
            '#########',
            '#   #####',
            '# $  ####',
            '## $ ####',
            '###=@.  #',
            '###  .= #',
            '###     #',
            '#########',
        ],
        13: [
            '#######',
            '#. ####',
            '#.@ ###',
            '#. $###',
            '##$ ###',
            '## $  #',
            '##    #',
            '##  ###',
            '#######',
        ],
        14: [
            '#######',
            '#     #',
            '# = = #',
            '#. $*@#',
            '#   ###',
            '#######',
        ],
        15: [
            '#########',
            '######@=#',
            '#    .* #',
            '#   =   #',
            '#####$= #',
            '#####   #',
            '#########',
        ],
        16: [
            '##########',
            '##  ######',
            '##     ###',
            '## ==   ##',
            '#. .= @$##',
            '#   = $$ #',
            '#  .=    #',
            '##########',
        ],
        17: [
            '######',
            '# @ ##',
            '#...##',
            '#$$$##',
            '#    #',
            '#    #',
            '######',
        ],
        18: [
            '#######',
            '#     #',
            '#. .  #',
            '# == ##',
            '#  $ ##',
            '###$ ##',
            '###@ ##',
            '###  ##',
            '#######',
        ],
        19: [
            '########',
            '#   .. #',
            '#  @$$ #',
            '####= ##',
            '####  ##',
            '####  ##',
            '####  ##',
            '########',
        ],
        20: [
            '#########',
            '#     ###',
            '#  @$$..#',
            '###= == #',
            '###     #',
            '###  ####',
            '###  ####',
            '#########',
        ],
        21: [
            '#######',
            '#  ####',
            '# . . #',
            '# $$=@#',
            '##    #',
            '#######',
        ],
        22: [
            '#######',
            '#   ###',
            '#. .  #',
            '#   = #',
            '## =  #',
            '##@$$ #',
            '##    #',
            '##  ###',
            '#######',
        ],
        23: [
            '#######',
            '#  *  #',
            '#     #',
            '## = ##',
            '##$@.##',
            '##   ##',
            '#######',
        ],
        24: [
            '#######',
            '###   #',
            '###$$@#',
            '#   ==#',
            '#     #',
            '# . . #',
            '#######',
        ],
        25: [
            '#######',
            '##  ###',
            '## $$ #',
            '##... #',
            '#  @$ #',
            '#   ###',
            '#######',
        ],
        26: [
            '######',
            '## @ #',
            '##   #',
            '##=$ #',
            '# ...#',
            '# $$ #',
            '###  #',
            '######',
        ],
        27: [
            '#######',
            '#   .##',
            '# == ##',
            '#  $$@#',
            '# =   #',
            '#.  ###',
            '#######',
        ],
        28: [
            '#######',
            '#   ###',
            '# @ ###',
            '# $$###',
            '##. . #',
            '##    #',
            '#######',
        ],
        29: [
            '###########',
            '######   ##',
            '######    #',
            '#######   #',
            '##     =. #',
            '# $ $ @  ##',
            '# ======.##',
            '#        ##',
            '###########',
        ],
        30: [
            '######',
            '#  ###',
            '# $$ #',
            '#... #',
            '# @$ #',
            '#   ##',
            '######',
        ],
        31: [
            '#######',
            '###  ##',
            '##@$.##',
            '# $$  #',
            '# . . #',
            '###   #',
            '#######',
        ],
        32: [
            '#######',
            '##  ###',
            '#     #',
            '#.**$@#',
            '#   ###',
            '##  ###',
            '#######',
        ],
        33: [
            '#######',
            '#. #  #',
            '#  $  #',
            '#. $=@#',
            '#  $  #',
            '#. #  #',
            '#######',
        ],
        34: [
            '#########',
            '###  ####',
            '#       #',
            '#@$***. #',
            '#       #',
            '#########',
        ],
        35: [
            '######',
            '##  ##',
            '#. $##',
            '#.$ ##',
            '#.$ ##',
            '#.$ ##',
            '#. $##',
            '#   @#',
            '##   #',
            '######',
        ],
        36: [
            '###############',
            '#  ############',
            '# $ $ $ $ $ @ #',
            '# .....       #',
            '###############',
        ],
        37: [
            '#########',
            '######=.#',
            '#   ##=.#',
            '#   $ =.#',
            '# $  $  #',
            '#####@= #',
            '#####   #',
            '#########',
        ],
        38: [
            '##########',
            '#        #',
            '# ==.=== #',
            '# = $$ . #',
            '# . @$== #',
            '#####    #',
            '##########',
        ],
        39: [
            '##########',
            '#   ######',
            '# = = .###',
            '#    $ ###',
            '#== =$.  #',
            '#   =@   #',
            '# = ######',
            '#   ######',
            '##########',
        ],
        40: [
            '#######',
            '##   ##',
            '##   ##',
            '# $$$ #',
            '# .+. #',
            '#######',
        ],
        41: [
            '########',
            '#     ##',
            '#@$$$ =#',
            '#  =...#',
            '##    ##',
            '########',
        ],
        42: [
            '#######',
            '####  #',
            '####@ #',
            '####$.#',
            '#   $.#',
            '# = $.#',
            '#    ##',
            '#######',
        ],
        43: [
            '#########',
            '###### @#',
            '######  #',
            '###### .#',
            '#   $  .#',
            '#  $$= .#',
            '#    ####',
            '###  ####',
            '#########',
        ],
        44: [
            '########',
            '#      #',
            '# $*** #',
            '# *  * #',
            '# *  * #',
            '# ***. #',
            '#     @#',
            '########',
        ],
        45: [
            '######',
            '#... #',
            '#  $ #',
            '# =$##',
            '#  $ #',
            '#  @ #',
            '######',
        ],
        46: [
            '#######',
            '##    #',
            '#  == #',
            '# = $ #',
            '#  * .#',
            '## =@##',
            '##   ##',
            '#######',
        ],
        47: [
            '###########',
            '###     ###',
            '# $ $   ###',
            '# === ==###',
            '# @ . .   #',
            '#   ===   #',
            '###########',
        ],
        48: [
            '########',
            '#  @ ###',
            '#  = ###',
            '# .=  ##',
            '# .$$$ #',
            '# .=   #',
            '####   #',
            '########',
        ],
        49: [
            '########',
            '# @  ###',
            '# $= ###',
            '# $  ###',
            '# $ ####',
            '##= ####',
            '##  =  #',
            '##...  #',
            '##     #',
            '########',
        ],
        50: [
            '##########',
            '###  #####',
            '#  $  @..#',
            '# $    = #',
            '### ==== #',
            '###      #',
            '##########',
        ],
        51: [
            '########',
            '#  #####',
            '#    ###',
            '#  $*@ #',
            '### .= #',
            '###    #',
            '########',
        ],
        52: [
            '######',
            '### @#',
            '#  $ #',
            '#  *.#',
            '#  *.#',
            '#  $ #',
            '###  #',
            '######',
        ],
        53: [
            '#######',
            '##. .##',
            '# * * #',
            '#  =  #',
            '# $ $ #',
            '## @ ##',
            '#######',
        ],
        54: [
            '############',
            '#######    #',
            '####### .  #',
            '###  ===.  #',
            '# $  $  . ##',
            '# @$$ = . ##',
            '##    ######',
            '############',
        ],
        55: [
            '##########',
            '# @ =  ###',
            '#      ###',
            '#####$ ###',
            '#####  ###',
            '#####$ ..#',
            '#####  ==#',
            '##########',
        ],
        56: [
            '#######',
            '#   ###',
            '#  $  #',
            '##* . #',
            '##   @#',
            '#######',
        ],
        57: [
            '########',
            '###  ###',
            '###@ ###',
            '###  ###',
            '### =###',
            '#    * #',
            '#  $   #',
            '#####. #',
            '########',
        ],
        58: [
            '#######',
            '#  ####',
            '#.*$  #',
            '# .$= #',
            '## @  #',
            '##   ##',
            '#######',
        ],
        59: [
            '#############',
            '#          ##',
            '# ======= @##',
            '# =         #',
            '# =  $   =  #',
            '# $$ ###==  #',
            '###  ### ...#',
            '########    #',
            '#############',
        ],
        60: [
            '##########',
            '##       #',
            '##@===== #',
            '#  =   = #',
            '#  =   $.#',
            '#  ==$==.#',
            '#=$==  =.#',
            '#   $  =.#',
            '#   =  =##',
            '##########',
        ],
        61: [
            '#########',
            '#      ##',
            '# ==== ##',
            '# =...@##',
            '# ===$###',
            '# =     #',
            '#  $$ $ #',
            '####   ##',
            '####.=###',
            '#########',
        ],
        62: [
            '#############',
            '####    ==  #',
            '#  $$$....$@#',
            '#      ###  #',
            '#   #########',
            '#############',
        ],
        63: [
            '########',
            '# @=  ##',
            '#.$   ##',
            '#. = $##',
            '#.$=   #',
            '#. = $ #',
            '#  =   #',
            '########',
        ],
        64: [
            '##########',
            '##    ####',
            '#   $ ####',
            '#  $$ ####',
            '### .=####',
            '####.= @ #',
            '####.  $ #',
            '####. ####',
            '##########',
        ],
        65: [
            '#########',
            '###    ##',
            '###  $ ##',
            '#####$ ##',
            '## $ $ ##',
            '#....= ##',
            '#     @ #',
            '##  #   #',
            '#########',
        ],
        66: [
            '##############',
            '####  ########',
            '#### $ $.....#',
            '#   $   =====#',
            '#@=== ########',
            '#  $  ########',
            '# $ = ########',
            '## =  ########',
            '##    ########',
            '##############',
        ],
        67: [
            '#######',
            '#   ###',
            '# =  ##',
            '#@$*.##',
            '##  . #',
            '## $= #',
            '###   #',
            '#######',
        ],
        68: [
            '##########',
            '##  ######',
            '##    $  #',
            '# .= $   #',
            '# .=$#####',
            '# .@ #####',
            '##########',
        ],
        69: [
            '###########',
            '#  ####  ##',
            '#  =  =  ##',
            '#  =    $##',
            '#  . .=$  #',
            '#@ == = $ #',
            '#   . =   #',
            '###########',
        ],
        70: [
            '########',
            '# @ ####',
            '#      #',
            '# $ $$ #',
            '##$==  #',
            '#   ==##',
            '# ..  ##',
            '##..  ##',
            '####  ##',
            '########',
        ],
        71: [
            '#############',
            '#     =   ###',
            '# $@$ = .  .#',
            '# == === == #',
            '# =       = #',
            '# =   =   = #',
            '# ========= #',
            '#           #',
            '#############',
        ],
        72: [
            '##########',
            '###  #####',
            '##  $  @ #',
            '##  $=   #',
            '##== ==###',
            '#  =   ###',
            '#    $ ###',
            '# ..=  ###',
            '#  .######',
            '#  #######',
            '##########',
        ],
        73: [
            '########',
            '#  #####',
            '# $$ $ #',
            '#      #',
            '## == ##',
            '#...=@##',
            '# === ##',
            '#      #',
            '#  #   #',
            '########',
        ],
        74: [
            '###########',
            '##  #######',
            '##$ @=   .#',
            '## =$$   .#',
            '#  $  ==..#',
            '#   = #####',
            '###   #####',
            '###########',
        ],
        75: [
            '##########',
            '## ....###',
            '#   ===###',
            '#   $ $ @#',
            '###  $ $ #',
            '#####    #',
            '##########',
        ],
        76: [
            '##########',
            '##   #####',
            '#    #####',
            '#  =.=   #',
            '#@ =.= $ #',
            '#  =.=  ##',
            '#    =  ##',
            '##  ==$$##',
            '###     ##',
            '###  #####',
            '##########',
        ],
        77: [
            '###########',
            '# @ .... ##',
            '#   ====$##',
            '## =  $ $ #',
            '## $      #',
            '##   ######',
            '###########',
        ],
        78: [
            '###########',
            '##     ####',
            '#  $ $  ###',
            '# $ $ $ ###',
            '## === ####',
            '##@  .....#',
            '###     ==#',
            '###########',
        ],
        79: [
            '##########',
            '##    =  #',
            '## $=$=  #',
            '#  .$.@  #',
            '#  .=    #',
            '##########',
        ],
        80: [
            '##########',
            '#  #######',
            '#  . ## .#',
            '# $=    .#',
            '## == = .#',
            '##    =  #',
            '##### =  #',
            '### @$ ###',
            '### $$ ###',
            '###    ###',
            '##########',
        ],
        81: [
            '######',
            '##   #',
            '## . #',
            '## * #',
            '#  *##',
            '#  @##',
            '## $ #',
            '##   #',
            '######',
        ],
        82: [
            '########',
            '#   ####',
            '# .   ##',
            '##*=$  #',
            '# .= $ #',
            '# @== ##',
            '#     ##',
            '########',
        ],
        83: [
            '########',
            '#    ###',
            '# $ $ ##',
            '## $$  #',
            '## =   #',
            '## == ##',
            '##  . .#',
            '## @. .#',
            '##  ####',
            '########',
        ],
        84: [
            '############',
            '#  ... #####',
            '#  === #####',
            '#  = $  ####',
            '## =@$  ####',
            '## = $  ####',
            '## === =####',
            '##         #',
            '##   ===   #',
            '############',
        ],
        85: [
            '###########',
            '########  #',
            '## $      #',
            '##   $ $  #',
            '## =#######',
            '## = .  ###',
            '#  = =  ###',
            '#  @ . ####',
            '## = = ####',
            '##   . ####',
            '###########',
        ],
        86: [
            '#########',
            '#####  ##',
            '### $   #',
            '## $  = #',
            '# @=$$  #',
            '# ..  ###',
            '# ..#####',
            '#########',
        ],
        87: [
            '#########',
            '######  #',
            '#       #',
            '#  ... .#',
            '##$=#####',
            '# $  ####',
            '#   $####',
            '##  $  ##',
            '### @  ##',
            '#########',
        ],
        88: [
            '#########',
            '######  #',
            '####    #',
            '####  = #',
            '####$ =.#',
            '####  = #',
            '####$ =.#',
            '####  = #',
            '####$ =.#',
            '# @     #',
            '#   =  ##',
            '#########',
        ],
        89: [
            '##########',
            '#   ##   #',
            '# $  $@= #',
            '#### = $ #',
            '####.=  ##',
            '####.= $##',
            '####.   ##',
            '####.   ##',
            '##########',
        ],
        90: [
            '##########',
            '##  @   ##',
            '## $  $ ##',
            '### == ###',
            '#  $..$  #',
            '#   ..   #',
            '##########',
        ],
        91: [
            '###########',
            '#    .=#  #',
            '# $$@..$$ #',
            '#   #=.   #',
            '###########',
        ],
        92: [
            '###############',
            '###  ##########',
            '###  ######   #',
            '###  ######.= #',
            '###=  $    .  #',
            '#   $$= ===.= #',
            '#   =   ===   #',
            '###########@ ##',
            '###########  ##',
            '###############',
        ],
        93: [
            '###########',
            '##   =   ##',
            '#    =    #',
            '#  $ = $  #',
            '#   *.*   #',
            '#===.@.===#',
            '#   *.*   #',
            '#  $ = $  #',
            '#    =    #',
            '##   =   ##',
            '###########',
        ],
        94: [
            '#########',
            '# @ #   #',
            '# $ $   #',
            '##$=== ##',
            '#  ...  #',
            '#   =   #',
            '######  #',
            '#########',
        ],
        95: [
            '########',
            '#@     #',
            '# .$$. #',
            '# $..$ #',
            '# $..$ #',
            '# .$$. #',
            '#      #',
            '########',
        ],
        96: [
            '###########',
            '###    ####',
            '###    ####',
            '###==  ####',
            '#   =.=####',
            '#   $@$   #',
            '#####.=   #',
            '##### == ##',
            '####   $.##',
            '####   ####',
            '###########',
        ]
    };

}

LevelService.init();
