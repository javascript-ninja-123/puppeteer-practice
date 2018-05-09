const fs = require('fs'),
    PNG = require('pngjs').PNG,
    pixelmatch = require('pixelmatch');



const compareScreenshots = fileName => {
    return new Promise((resolve, reject) => {
        const doneReading = () => {
            expect(img1.width).toBe(img2.width)
            expect(img1.height).toBe(img2.height)

            const numDiffPixels = pixelmatch(
                img1.data,
                img2.data,
                null,
                img1.width,
                img1.height,
                { threshold: 0.1 }
            )
            expect(nimDiffPixels).toBe(0)
            resolve()
    }
  const img1 = fs.createReadStream('testScreenShot.png').pipe(new PNG())
  const img2 = fs.createReadStream(fileName).pipe(new PNG()).on('parsed', doneReading),
}
}


export.modules = compareScreenshots
